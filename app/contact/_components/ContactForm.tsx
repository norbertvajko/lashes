"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // For toast notifications
import { LoadingSpinner } from "@/components/general/loading-spinner";

export const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telefon: "",
        message: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/emails/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    telefon: formData.telefon,
                    message: formData.message,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Email-ul a fost trimis cu succes!");
                setFormData({
                    name: "",
                    email: "",
                    telefon: "",
                    message: "",
                });
            } else {
                toast.error(data.error || "A apărut o eroare la trimiterea email-ului.");
            }
        } catch (error) {
            console.error("Eroare la trimiterea email-ului:", error);
            toast.error("A apărut o eroare la trimiterea email-ului.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="md:w-3/5 w-full h-1/2 md:h-full p-10 md:p-20 bg-left text-white flex flex-col justify-center mt-[-78px] sm:mt-[80px]">
            <h1 className="uppercase text-3xl md:text-4xl tracking-wider mb-4">Contact</h1>
            <p className="text-sm tracking-wide mb-4 md:w-3/4">
                Contacteaza-ne telefonic sau prin intermediul formularului de mai jos:
            </p>
            <form onSubmit={handleSubmit} id="contact-form" className="relative mt-8 w-full max-w-lg">
                <label htmlFor="name" className="uppercase text-xs mb-2 block">Nume si prenume</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nume intreg"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-500 p-2 mb-4 outline-none"
                />
                <label htmlFor="email" className="uppercase text-xs mb-2 block">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Adresa email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-500 p-2 mb-4 outline-none"
                />
                <label htmlFor="telefon" className="uppercase text-xs mb-2 block">Telefon</label>
                <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    placeholder="Numar telefon"
                    required
                    value={formData.telefon}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-500 p-2 mb-4 outline-none"
                />
                <label htmlFor="message" className="uppercase text-xs mb-2 block">Mesaj</label>
                <textarea
                    rows={6}
                    placeholder="Mesajul tau aici"
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-500 p-2 mb-4 outline-none resize-none"
                ></textarea>
                <Button variant={"secondary"} type="submit" id="submit" name="submit" disabled={isSubmitting}>
                    {isSubmitting ? <LoadingSpinner /> : "Trimite"}
                </Button>
            </form>
        </div>
    );
};
