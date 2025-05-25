"use client";

import { useState, useEffect } from "react";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { CONST_ADVANCE_PAYMENT_PRICE, CONST_STANDARD_COURSE_RATE_PRICE, CONST_EXCLUSIVE_COURSE_RATE_PRICE } from "@/constants/courses/data";
import { useUserPromoCode } from "@/hooks/use-user-promo-code";

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
    hasPromoCode?: boolean;
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
    const { promoCode } = useUserPromoCode();

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

    const handleCompletePay = async (discount = 0) => {
        if (!selectedOrder) return;

        const initialAdvance = CONST_ADVANCE_PAYMENT_PRICE;
        const totalCoursePrice = Number(selectedOrder.total);
        const hasRates = selectedOrder.hasRates;

        let rateAmountToPay;

        if (hasRates) {
            const restInitial = totalCoursePrice - initialAdvance;
            const discountedRestTotal = restInitial * (1 - discount / 100);
            const rateCount = 3;

            rateAmountToPay = discountedRestTotal / rateCount; // rată fixă
        } else {
            const advancePaid = Number(selectedOrder.advance);
            const remainingAmount = totalCoursePrice - advancePaid;
            rateAmountToPay = remainingAmount;
        }

        const amountInCents = Math.round(rateAmountToPay * 100);

        const payload = {
            name: selectedOrder.course,
            image: selectedOrder.image,
            price: amountInCents,
            totalAmount: totalCoursePrice * 100,
        };

        const res = await fetch('/api/stripe/checkout', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const session = await res.json();

        if (session.url) {
            window.location = session.url;
        } else {
            console.error("Failed to create session:", session.error);
        }
    };


    const handleStatusUpdate = async () => {
        if (!selectedOrder) return;

        const remainingAmount = Number(selectedOrder.total) - Number(selectedOrder.advance);

        const baseRateAmount = selectedOrder.hasRates && selectedOrder.course === "Modul Standard"
            ? CONST_STANDARD_COURSE_RATE_PRICE
            : selectedOrder.hasRates && selectedOrder.course === "Modul Exclusiv"
                ? CONST_EXCLUSIVE_COURSE_RATE_PRICE
                : remainingAmount;

        const shouldApplyDiscount = selectedOrder.hasPromoCode && promoCode?.discount;

        const rateAmountToPay = shouldApplyDiscount
            ? baseRateAmount * (1 - (promoCode?.discount ?? 0) / 100)
            : baseRateAmount;

        const payload = {
            orderId: selectedOrder.id,
            image: selectedOrder.image,
            amount: rateAmountToPay,
        };

        try {
            await handleCompletePay(shouldApplyDiscount ? promoCode.discount ?? 0 : 0);

            // Așteaptă puțin pentru webhook-ul Stripe
            await new Promise(resolve => setTimeout(resolve, 2000));

            const updatedOrderRes = await fetch(`/api/user/orders/${selectedOrder.id}`);
            const updatedOrder = await updatedOrderRes.json();

            if (!updatedOrder || updatedOrder.error) {
                console.error("Comanda actualizată nu a fost găsită.");
                return;
            }

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
                                        {/* <TableHead className="px-6 py-4 text-left font-medium text-black">Total(RON)</TableHead> */}
                                        {/* <TableHead className="px-6 py-4 text-left font-medium text-black">Rest plata(RON)</TableHead> */}
                                        <TableHead className="px-6 py-4 text-left font-medium text-black">Status</TableHead>
                                        <TableHead className="px-6 py-4 text-left font-medium text-black">Acțiuni</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id} className="bg-white shadow-lg rounded-lg p-4 mb-4 border md:border-0 border-gray-300 w-full m-0">
                                            <TableCell className="px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">ID Comandă:</span> {order.id}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Data:</span> {new Date(order.date).toLocaleDateString('ro-RO')}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Curs:</span> {order.course}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Avans:</span> {CONST_ADVANCE_PAYMENT_PRICE}
                                            </TableCell>
                                            {/* <TableCell className="px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Total(RON):</span>{" "}
                                                {(() => {
                                                    if (selectedOrder?.hasPromoCode) {
                                                        const total = Number(selectedOrder.total);        // total plătit efectiv (ex: 4200)
                                                            const advance = Number(selectedOrder.advance);    // avans plătit (ex: 1000)
                                                            const discount = promoCode?.discount ?? 0;        // discount procentual (ex: 20)

                                                            // Restul plătit cu discount (ex: 3200)
                                                            const discountedRest = total - advance;

                                                            // Refacem valoarea originală a restului fără discount (ex: 3200 / 0.8 = 4000)
                                                            const originalRest = discount > 0
                                                                ? discountedRest / (1 - discount / 100)
                                                                : discountedRest;

                                                            // Total real: avans + rest original (ex: 1000 + 4000 = 5000)
                                                            const realCourseTotal = advance + originalRest;
                                                            console.log(realCourseTotal, "realCourseTotal");
                                                            return realCourseTotal + advance
                                                    } else {
                                                        return Number(order.total)
                                                    }
                                                })()}
                                            </TableCell> */}
                                            {/* <TableCell className="px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Rest plata:</span>
                                                {(order.status === "Avans platit")
                                                    ? (() => {
                                                        const total = Number(order.total);
                                                        const advancePaid = Number(order.advance);
                                                        const initialAdvance = CONST_ADVANCE_PAYMENT_PRICE;
                                                        const discount = promoCode?.discount || 0;

                                                        const restInitial = total - initialAdvance;

                                                        if (order.status.includes("Rata")) {
                                                            const discountedRestTotal = restInitial * (1 - discount / 100);
                                                            const paidRates = advancePaid - initialAdvance;
                                                            const restAfterPaidRates = discountedRestTotal - paidRates;
                                                            return Math.round(restAfterPaidRates);
                                                        } else if (!discount) {
                                                            // doar avans plătit, fără rate, fara discount
                                                            return total - advancePaid;
                                                        } else if (discount) {
                                                            // doar avans plătit, fără rate, fara discount
                                                            return total - advancePaid;
                                                        }
                                                    })()
                                                    : 0}
                                            </TableCell> */}
                                            <TableCell className="px-6 py-4 text-black">
                                                <span className="block md:hidden font-medium">Status:</span> {order.status}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-center md:text-left">
                                                <Button size="sm" onClick={() => openModal(order)} className="bg-black text-white hover:bg-gray-800">
                                                    Vezi Detalii
                                                </Button>
                                            </TableCell>
                                        </TableRow>
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
                                {/* <p className="mb-2"><strong>Total de plata:</strong> {selectedOrder.total} RON {selectedOrder.status === "Plata finalizata" ? '✅' : ''}</p> */}

                                {/* {selectedOrder.status !== "Plata finalizata" && selectedOrder.hasRates ? ( */}
                                <>
                                    <p className="mb-2">
                                        {selectedOrder.status !== "Plata finalizata" ? (
                                            <>
                                                {selectedOrder.hasRates ? (
                                                    <>
                                                        {selectedOrder.hasPromoCode ? (
                                                            <>
                                                                {(() => {
                                                                    const total = Number(selectedOrder.total);
                                                                    const advancePaid = Number(selectedOrder.advance);
                                                                    const initialAdvance = CONST_ADVANCE_PAYMENT_PRICE;
                                                                    const discount = promoCode?.discount;
                                                                    const rateCount = 3;

                                                                    const restInitial = total - initialAdvance;
                                                                    const discountedRestTotal = restInitial * (1 - (discount ?? 0) / 100);
                                                                    const paidRates = advancePaid - initialAdvance;
                                                                    const restAfterPaidRates = discountedRestTotal - paidRates;
                                                                    const rateAmount = discountedRestTotal / rateCount;

                                                                    return (
                                                                        <>
                                                                            <p className="mb-2"><strong>Suma achitată (până acum):</strong> {advancePaid} RON</p>
                                                                            <p className="mb-2">
                                                                                <strong>Rest de plată:</strong> {restAfterPaidRates.toFixed(0)} RON{" "}
                                                                                {restAfterPaidRates > 0 && (discount ?? 0) > 0 && (
                                                                                    <small className="text-gray-500">({discount}% discount)</small>
                                                                                )}
                                                                            </p>
                                                                            <p className="mb-2"><strong>Sumă de plată per rată:</strong> {rateAmount.toFixed(0)} RON</p>
                                                                        </>
                                                                    );
                                                                })()}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {(() => {
                                                                    const total = Number(selectedOrder.total);
                                                                    const advancePaid = Number(selectedOrder.advance);
                                                                    const initialAdvance = CONST_ADVANCE_PAYMENT_PRICE;
                                                                    const rateCount = 3;

                                                                    const restInitial = total - initialAdvance;
                                                                    const paidRates = advancePaid - initialAdvance;
                                                                    const restAfterPaidRates = restInitial - paidRates;
                                                                    const rateAmount = restInitial / rateCount;

                                                                    return (
                                                                        <>
                                                                            <p className="mb-2"><strong>Suma achitată (până acum):</strong> {advancePaid} RON</p>
                                                                            <p className="mb-2"><strong>Rest de plată:</strong> {restAfterPaidRates} RON</p>
                                                                            <p className="mb-2"><strong>Sumă de plată per rată:</strong> {rateAmount.toFixed(0)} RON</p>
                                                                        </>
                                                                    );
                                                                })()}
                                                            </>
                                                        )}
                                                        <p className="mb-2">
                                                            {selectedOrder.status === "Rata 3 din 3 achitata" ? " " : (<><strong>Termen plată rată curentă:</strong><span className="text-red-400"> {nextPaymentDateS}</span></>)}
                                                        </p>
                                                    </>
                                                ) : selectedOrder.hasPromoCode && promoCode?.discount ? (
                                                    <>
                                                        {(() => {
                                                            const total = Number(selectedOrder.total);        // total plătit efectiv (ex: 4200)
                                                            const advance = Number(selectedOrder.advance);    // avans plătit (ex: 1000)
                                                            const discount = promoCode?.discount ?? 0;        // discount procentual (ex: 20)

                                                            // Restul plătit cu discount (ex: 3200)
                                                            const discountedRest = total - advance;

                                                            // Refacem valoarea originală a restului fără discount (ex: 3200 / 0.8 = 4000)

                                                            const originalRest = discount > 0
                                                                ? discountedRest / (1 - discount / 100)
                                                                : discountedRest;

                                                            // Total real: avans + rest original (ex: 1000 + 4000 = 5000)
                                                            const realCourseTotal = advance + originalRest;

                                                            return (
                                                                <>
                                                                    <p className="mb-2"><strong>Total de plată:</strong> {selectedOrder.hasPromoCode ? realCourseTotal : total} RON</p>
                                                                    <p className="mb-2"><strong>Rest de plată:</strong> {discountedRest} RON <small className="text-gray-500">({discount}% discount)</small></p>
                                                                </>
                                                            );
                                                        })()}
                                                    </>
                                                ) : (
                                                    <>
                                                        {(() => {
                                                            const total = Number(selectedOrder.total);
                                                            const advance = Number(selectedOrder.advance);
                                                            const rest = total - advance;

                                                            return (
                                                                <>
                                                                    <p className="mb-2"><strong>Total de plată:</strong> {total} RON</p>
                                                                    <p className="mb-2"><strong>Rest de plată:</strong> {rest} RON</p>
                                                                </>
                                                            );
                                                        })()}
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <p className="mb-2">
                                                <strong>Rest de plată:</strong>{" "}
                                                {selectedOrder.status === "Plata finalizata"
                                                    ? 0
                                                    : Number(selectedOrder.total) - Number(selectedOrder.advance) === 834
                                                        ? 833
                                                        : promoCode?.discount
                                                            ? ((Number(selectedOrder.total) - Number(selectedOrder.advance)) * (1 - promoCode.discount / 100))
                                                            : Number(selectedOrder.total) - Number(selectedOrder.advance)
                                                } RON
                                            </p>
                                        )}
                                    </p>
                                    {/* {selectedOrder.hasRates && (
                                            <p className="mb-2">
                                                <strong>Sumă de plată per rată: </strong>
                                                {selectedOrder.course === "Modul Standard" || selectedOrder.course === "Modul Exclusiv" ? (
                                                    <>
                                                        {(
                                                            (selectedOrder.course === "Modul Standard"
                                                                ? CONST_STANDARD_COURSE_RATE_PRICE
                                                                : CONST_EXCLUSIVE_COURSE_RATE_PRICE) *
                                                            (1 - (promoCode?.discount ?? 0) / 100)
                                                        )} RON
                                                    </>
                                                ) : null}
                                            </p>
                                        )} */}
                                </>
                                {/* ) : ( */}
                                {/* <p className="mb-2">
                                        <strong>Rest de plată:</strong>{" "}
                                        {selectedOrder.status === "Plata finalizata"
                                            ? 0
                                            : Number(selectedOrder.total) - Number(selectedOrder.advance) === 834
                                                ? 833
                                                : promoCode?.discount
                                                    ? ((Number(selectedOrder.total) - Number(selectedOrder.advance)) * (1 - promoCode.discount / 100))
                                                    : Number(selectedOrder.total) - Number(selectedOrder.advance)
                                        } RON */}
                                {/* </p>)} */}
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
