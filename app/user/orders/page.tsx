"use client";

import { useState, useEffect } from "react";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { CONST_ADVANCE_PAYMENT_PRICE, CONST_STANDARD_COURSE_RATE_PRICE, CONST_EXCLUSIVE_COURSE_RATE_PRICE } from "@/constants/courses/data";

type Order = {
    id: number;
    customer: string;
    image: string;
    date: string;
    course: string;
    advance: string;
    total: string;
    status: string;
    hasRates: boolean;
    rateNumber?: number;
    nextRateDate?: Date
};

type CustomModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

function CustomModal({ isOpen, onClose, children }: CustomModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <div className="flex justify-end">
                    <Button size="sm" variant="ghost" onClick={onClose} className="text-black">
                        ✕
                    </Button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message

    const router = useRouter();

    const navigateToCourses = () => {
        router.push('/courses');
    };

    const session = useSession();
    const isLoggedIn = session.isSignedIn;

    // Verificăm dacă utilizatorul nu este logat și îl redirecționăm
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/'); // Redirecționează utilizatorul către pagina principală
        }
    }, [isLoggedIn, router]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("/api/user/orders");
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();
                setOrders(data.length > 0 ? data : null); // Dacă nu există comenzi, setăm null
            } catch (error) {
                console.error(error);
                setOrders(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const openModal = (order: Order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedOrder(null);
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    const handleCompletePay = async () => {
        if (!selectedOrder) return;

        const remainingAmount = Number(selectedOrder.total) - Number(selectedOrder.advance); // Calculăm restul de plată
        const amountInCents = Math.round(remainingAmount * 100); // Convertim suma la unități de monedă (RON -> bani, adică 1 RON = 100 bani)

        // Verificăm dacă există rate
        const hasRates = selectedOrder.hasRates ? true : false; // True dacă are rate, altfel false
        const rateNumber = selectedOrder.rateNumber ? selectedOrder.rateNumber : 1; // Verificăm numărul ratei

        // Calculăm suma de plată pentru o rată, dacă există rate
        const rateAmountToPay = selectedOrder.hasRates && selectedOrder.course === "Modul Standard"
            ? CONST_STANDARD_COURSE_RATE_PRICE
            : selectedOrder.hasRates && selectedOrder.course === "Modul Exclusiv"
                ? CONST_EXCLUSIVE_COURSE_RATE_PRICE
                : remainingAmount.toFixed(0);

        // Construim payload-ul pentru Stripe
        const payload = {
            name: selectedOrder.course,
            image: selectedOrder.image,
            price: hasRates ? Math.round(Number(rateAmountToPay) * 100) : amountInCents, // Dacă există rate, plata va fi pentru o rată
            totalAmount: Number(selectedOrder.total) * 100,
        };

        // Creăm sesiunea de checkout pentru Stripe
        const res = await fetch('/api/stripe/checkout', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const session = await res.json();

        if (session.url) {
            window.location = session.url; // Redirecționează utilizatorul către checkout-ul Stripe
        } else {
            console.error("Failed to create session:", session.error);
        }
    };

    // Înainte de a actualiza statusul comenzii, folosim această funcție pentru a crea checkout-ul Stripe
    const handleStatusUpdate = async () => {
        if (!selectedOrder) return;

        const remainingAmount = Number(selectedOrder.total) - Number(selectedOrder.advance);

        const rateAmountToPay = selectedOrder.hasRates && selectedOrder.course === "Modul Standard"
            ? CONST_STANDARD_COURSE_RATE_PRICE
            : selectedOrder.hasRates && selectedOrder.course === "Modul Exclusiv"
                ? CONST_EXCLUSIVE_COURSE_RATE_PRICE
                : remainingAmount.toFixed(0);

        const payload = {
            orderId: selectedOrder.id,
            image: selectedOrder.image,
            amount: rateAmountToPay,
        };

        try {
            await handleCompletePay(); // Deschide checkout-ul Stripe

            // ⚠️ Stripe va trimite un webhook dacă plata e reușită → actualizează în backend

            // 🔁 Așteaptă un pic și apoi cere comanda actualizată din backend
            await new Promise(resolve => setTimeout(resolve, 2000)); // așteaptă puțin ca Stripe să proceseze webhook-ul

            const updatedOrderRes = await fetch(`/api/user/orders/${selectedOrder.id}`);
            const updatedOrder = await updatedOrderRes.json();

            if (!updatedOrder || updatedOrder.error) {
                console.error("Comanda actualizată nu a fost găsită.");
                return;
            }

            // 🟢 Actualizează UI-ul cu datele corecte
            setOrders(prevOrders =>
                prevOrders
                    ? prevOrders.map(order =>
                        order.id === selectedOrder.id
                            ? updatedOrder
                            : order
                    )
                    : null
            );

            closeModal();
        } catch (error) {
            console.error("A apărut o eroare la procesarea plății:", error);
        }
    };

    let nextPaymentDate = null;

    if (selectedOrder?.hasRates) {
        // Creăm un obiect Date din selectedOrder.date
        const orderDate = new Date(selectedOrder.date);

        // Adăugăm 30 de zile la data curentă
        orderDate.setDate(orderDate.getDate() + 30);

        // Setăm ora la 12:00 PM pentru plata următoare
        orderDate.setHours(12, 0, 0, 0);

        // Salvează data și timpul final
        nextPaymentDate = orderDate;
    }

    // Formatarea datei în formatul 08.06.2025
    const nextPaymentDateS = nextPaymentDate
        ? `${nextPaymentDate.getDate().toString().padStart(2, '0')}.${(nextPaymentDate.getMonth() + 1).toString().padStart(2, '0')}.${nextPaymentDate.getFullYear()}`
        : null;

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div className="min-h-[calc(100vh-260px)] flex flex-col">
            <div className="flex-grow flex justify-center items-center">
                <div className="w-full pt-[122px] sm:pt-4 max-w-7xl bg-white rounded-lg shadow-lg p-8">
                    {orders ? <h1 className="text-3xl font-bold mb-8 text-center text-black">Comenzile mele</h1> : <p className="text-2xl pb-6 font-bold text-center text-black">Nici un curs gasit 😔</p>}

                    {orders ? (
                        <div className="w-full">
                            <Table className="w-full">
                                <TableHeader className="hidden md:table-header-group">
                                    <TableRow className="bg-gray-200 border-b border-gray-300">
                                        <TableHead className="px-6 py-4 text-left font-medium text-black">ID Comandă</TableHead>
                                        <TableHead className="px-6 py-4 text-left font-medium text-black">Data</TableHead>
                                        <TableHead className="px-6 py-4 text-left font-medium text-black">Curs</TableHead>
                                        <TableHead className="px-6 py-4 text-left font-medium text-black">Avans(RON)</TableHead>
                                        <TableHead className="px-6 py-4 text-left font-medium text-black">Total(RON)</TableHead>
                                        <TableHead className="px-6 py-4 text-left font-medium text-black">Rest plata(RON)</TableHead>
                                        <TableHead className="px-6 py-4 text-left font-medium text-black">Status</TableHead>
                                        <TableHead className="px-6 py-4 text-left font-medium text-black">Acțiuni</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="md:table-row flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-4 mb-4 border md:border-0 border-gray-300 w-full m-0"
                                        >
                                            <div className="md:table-cell px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">ID Comandă:</span> {order.id}
                                            </div>

                                            <div className="md:table-cell px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Data:</span> {new Date(order.date).toLocaleDateString('ro-RO')}
                                            </div>
                                            <div className="md:table-cell px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Curs:</span> {order.course}
                                            </div>
                                            <div className="md:table-cell px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Avans:</span>
                                                {CONST_ADVANCE_PAYMENT_PRICE}
                                            </div>
                                            <div className="md:table-cell px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Total(RON):</span> {order.total}
                                            </div>
                                            <div className="md:table-cell px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Rest plata:</span>
                                                {(order.status === "Avans platit" || order.status.includes("Rata"))
                                                    ? Number(order.total) - Number(order.advance)
                                                    : 0}
                                            </div>
                                            <div className="md:table-cell px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Status:</span> {order.status}
                                            </div>
                                            <div className="md:table-cell px-6 py-4 text-center md:text-left">
                                                <Button size="sm" onClick={() => openModal(order)} className="bg-black text-white hover:bg-gray-800">
                                                    Vezi Detalii
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center">
                            <img src="/assets/images/no-courses.png" alt="Nu exista cursuri" className="w-48 mx-auto mb-4" />
                            <Button onClick={navigateToCourses}>
                                Descoperă Cursurile
                            </Button>
                        </div>
                    )}

                    {/* Messages for success or error */}
                    {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
                    {successMessage && <div className="text-green-500 text-center mt-4">{successMessage}</div>}

                    <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                        {selectedOrder && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-center text-black">Detalii comandă</h2>
                                <p className="mb-2"><strong>ID Comandă:</strong> {selectedOrder.id}</p>
                                <p className="mb-2"><strong>Data:</strong> {new Date(selectedOrder.date).toLocaleDateString('ro-RO')}</p>
                                <p className="mb-2"><strong>Curs:</strong> {selectedOrder.course}</p>
                                <p className="mb-2"><strong>Avans:</strong> {CONST_ADVANCE_PAYMENT_PRICE} RON ✅</p>

                                <p className="mb-2"><strong>Total de plata:</strong> {selectedOrder.total} RON {selectedOrder.status === "Plata finalizata" ? '✅' : ''}</p>

                                {selectedOrder.status !== "Plata finalizata" && selectedOrder.hasRates ? (
                                    <>
                                        <p className="mb-2">
                                            <strong>Rest de plată:</strong>{" "}
                                            {(Math.abs(Number(selectedOrder?.total ?? 0) - Number(selectedOrder?.advance ?? 0)) <= 1
                                                ? "0"
                                                : (Number(selectedOrder.total) - Number(selectedOrder.advance))
                                            )} RON
                                        </p>
                                        {(selectedOrder.hasRates) && (
                                            <p className="mb-2">
                                                <strong>Sumă de plată per rată: </strong>
                                                {selectedOrder.course === "Modul Standard"
                                                    ? `${CONST_STANDARD_COURSE_RATE_PRICE} RON`
                                                    : selectedOrder.course === "Modul Exclusiv"
                                                        ? `${CONST_EXCLUSIVE_COURSE_RATE_PRICE} RON`
                                                        : null}
                                            </p>
                                        )}
                                        <p className="mb-2">
                                            <strong>Termen plată rată curentă:</strong> {nextPaymentDateS}
                                        </p>
                                    </>
                                ) : (
                                    <p className="mb-2">
                                        <strong>Rest de plată:</strong>{" "}
                                        {selectedOrder.status === "Plata finalizata"
                                            ? 0
                                            : Number(selectedOrder.total) - Number(selectedOrder.advance) === 834
                                                ? 833
                                                : Number(selectedOrder.total) - Number(selectedOrder.advance)} RON
                                    </p>)}
                                <p className="mb-4"><strong>Status:</strong> {selectedOrder.status}</p>

                                <div className="text-center flex flex-col gap-2">
                                    {selectedOrder.status !== "Plata finalizata" && (selectedOrder?.rateNumber ?? 0) < 3 ? (
                                        selectedOrder.hasRates ? (
                                            <Button
                                                variant="primary"
                                                onClick={handleStatusUpdate}
                                                className="bg-black text-white hover:bg-gray-800"
                                            >
                                                {selectedOrder.status === "Avans platit" ? (
                                                    <span>Plătește rata 1 din 3</span>
                                                ) :
                                                    <span>Plătește rata {(selectedOrder?.rateNumber ?? 0) + 1} din 3</span>
                                                }

                                            </Button>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                onClick={handleStatusUpdate}
                                                className="bg-black text-white hover:bg-gray-800"
                                            >
                                                Plătește diferența
                                            </Button>
                                        )
                                    ) : null}

                                    <Button variant="outline" onClick={closeModal} className="bg-white text-black">
                                        Închide
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CustomModal>
                </div>
            </div>
        </div>
    );
}
