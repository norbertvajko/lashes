"use client";

import { useState, useEffect } from "react";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

    const router = useRouter();

    const navigateToCourses = () => {
        router.push('/courses');
    };

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
    };

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div className="min-h-[calc(100vh-260px)] flex flex-col">
            <div className="flex-grow flex justify-center items-center">
                <div className="w-full pt-[122px] sm:pt-4 max-w-7xl bg-white rounded-lg shadow-lg p-8">
                    {orders ? <h1 className="text-3xl font-bold mb-8 text-center text-black">Cursurile mele 📚</h1> : <p className="text-2xl pb-6 font-bold text-center text-black">Nici un curs gasit 😔</p>}

                    {orders ? (
                        <Table className="border-collapse border border-gray-200 shadow-lg w-full">
                            <TableHeader>
                                <TableRow className="bg-gray-200 border-b border-gray-300">
                                    <TableHead className="px-6 py-4 text-left font-medium text-black">ID Comandă</TableHead>
                                    <TableHead className="px-6 py-4 text-left font-medium text-black">Client</TableHead>
                                    <TableHead className="px-6 py-4 text-left font-medium text-black">Data</TableHead>
                                    <TableHead className="px-6 py-4 text-left font-medium text-black">Curs</TableHead>
                                    <TableHead className="px-6 py-4 text-left font-medium text-black">Avans</TableHead>
                                    <TableHead className="px-6 py-4 text-left font-medium text-black">Total</TableHead>
                                    <TableHead className="px-6 py-4 text-left font-medium text-black">Status</TableHead>
                                    <TableHead className="px-6 py-4 text-left font-medium text-black">Acțiuni</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id} className="hover:bg-gray-100">
                                        <TableCell className="px-6 py-4 border-t border-gray-300 text-black">{order.id}</TableCell>
                                        <TableCell className="px-6 py-4 border-t border-gray-300 text-black">{order.customer}</TableCell>
                                        <TableCell className="px-6 py-4 border-t border-gray-300 text-black">{order.date}</TableCell>
                                        <TableCell className="px-6 py-4 border-t border-gray-300 text-black">{order.course}</TableCell>
                                        <TableCell className="px-6 py-4 border-t border-gray-300 text-black">{order.advance}</TableCell>
                                        <TableCell className="px-6 py-4 border-t border-gray-300 text-black">{order.total}</TableCell>
                                        <TableCell className="px-6 py-4 border-t border-gray-300 text-black">{order.status}</TableCell>
                                        <TableCell className="px-6 py-4 border-t border-gray-300">
                                            <Button size="sm" onClick={() => openModal(order)} className="bg-black text-white hover:bg-gray-800">
                                                Vezi Detalii
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center">
                            <Image src="/assets/images/no-courses.png" alt="Nu exista cursuri" className="w-48 mx-auto mb-4" />
                            <Button onClick={navigateToCourses} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none focus:ring-0 font-medium text-sm px-5 py-2.5 text-center">
                                Descoperă Cursurile 
                            </Button>
                        </div>
                    )}

                    <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                        {selectedOrder && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-center text-black">Detalii Comandă</h2>
                                <p className="mb-2"><strong>ID Comandă:</strong> {selectedOrder.id}</p>
                                <p className="mb-2"><strong>Client:</strong> {selectedOrder.customer}</p>
                                <p className="mb-2"><strong>Data:</strong> {selectedOrder.date}</p>
                                <p className="mb-2"><strong>Curs:</strong> {selectedOrder.course}</p>
                                <p className="mb-2"><strong>Avans:</strong> {selectedOrder.advance}</p>
                                <p className="mb-4"><strong>Total:</strong> {selectedOrder.total}</p>
                                <p className="mb-4"><strong>Status:</strong> {selectedOrder.status}</p>

                                <div className="text-center">
                                    <Button variant="secondary" onClick={closeModal} className="bg-black text-white hover:bg-gray-800">
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
