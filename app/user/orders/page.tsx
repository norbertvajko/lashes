"use client";

import { useState, useEffect } from "react";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { CONST_ADVANCE_PAYMENT_PRICE } from "@/constants/courses/data";

type Order = {
    id: number;
    customer: string;
    date: string;
    course: string;
    advance: string;
    total: string;
    status: string;
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
    const [isPaid, setIsPaid] = useState(false);

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
        setErrorMessage(null); // Reset error message
        setSuccessMessage(null); // Reset success message
    };

    const handleCompletePay = async () => {
        if (!selectedOrder) return;

        const remainingAmount = Number(selectedOrder.total) - Number(selectedOrder.advance); // Calculăm restul de plată
        const amountInCents = Math.round(remainingAmount * 100); // Convertim suma la unități de monedă (RON -> bani, adică 1 RON = 100 bani)

        // Construim payload-ul pentru Stripe
        const payload = {
            name: selectedOrder.course,
            price: amountInCents,
            totalAmount: Number(selectedOrder.total) * 100
        };

        // Creăm sesiunea de checkout pentru restul de plată
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

        await handleCompletePay(); // Creează checkout-ul Stripe pentru restul de plată

        // După ce utilizatorul a plătit, actualizăm statusul
        const remainingAmount = Number(selectedOrder.total) - Number(selectedOrder.advance);

        const payload = {
            orderId: selectedOrder.id,
            amount: remainingAmount,
        };

        try {
            const res = await fetch(`/api/user/orders/${selectedOrder.id}/complete`, {
                method: "PATCH",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            if (data.success) {
                setOrders(prevOrders =>
                    prevOrders
                        ? prevOrders.map(order =>
                            order.id === selectedOrder.id
                                ? { ...order, status: "Plata finalizata" }
                                : order
                        )
                        : null
                );
                closeModal();
            } else {
                console.error("Plata nu a fost procesată corect.");
            }
        } catch (error) {
            console.error("A apărut o eroare la procesarea plății:", error);
        }
    };

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
                                                {order.status === "Avans platit" ? Number(order.total) - Number(order.advance) : 0}
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
                            <Button onClick={navigateToCourses} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none focus:ring-0 font-medium text-sm px-5 py-2.5 text-center">
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
                                <h2 className="text-xl font-semibold mb-4 text-center text-black">Detalii Comandă</h2>
                                <p className="mb-2"><strong>ID Comandă:</strong> {selectedOrder.id}</p>
                                <p className="mb-2"><strong>Data:</strong> {new Date(selectedOrder.date).toLocaleDateString('ro-RO')}</p>
                                <p className="mb-2"><strong>Curs:</strong> {selectedOrder.course}</p>
                                <p className="mb-2"><strong>Avans:</strong> {CONST_ADVANCE_PAYMENT_PRICE} RON ✅</p>
                                <p className="mb-4"><strong>Total:</strong> {selectedOrder.total} RON {selectedOrder.status === "Plata finalizata" ? '✅' : ''}</p>
                                <p className="mb-4"><strong>Rest plata:</strong> {selectedOrder.status === "Plata finalizata" ? 0 : Number(selectedOrder.total) - Number(selectedOrder.advance)} RON</p>
                                <p className="mb-4"><strong>Status:</strong> {selectedOrder.status}</p>

                                <div className="text-center flex flex-col gap-2">
                                    {selectedOrder.status !== "Plata finalizata" ? (
                                        <Button
                                            variant="primary"
                                            onClick={handleStatusUpdate}
                                            className="bg-black text-white hover:bg-gray-800"
                                        >
                                            Plateste diferenta
                                        </Button>
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
