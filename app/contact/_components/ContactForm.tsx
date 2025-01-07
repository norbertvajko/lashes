import React from "react";
import { Button } from "@/components/ui/button"

export const ContactForm = () => {
    return (
        <div className="md:w-3/5 w-full h-1/2 md:h-full p-10 md:p-20 bg-left text-white flex flex-col justify-center mt-[-78px] sm:mt-[80px]">
            <h1 className="uppercase text-3xl md:text-4xl tracking-wider mb-4">Contact</h1>
            <p className="text-sm tracking-wide mb-4 md:w-3/4">Contacteaza-ne telefonic sau prin intermediul formularului de mai jos:​</p>
            <form id="contact-form" method="post" className="relative mt-8 w-full max-w-lg">
                <label htmlFor="name" className="uppercase text-xs mb-2 block">Nume si prenume</label>
                <input type="text" id="name" name="name" placeholder="Nume intreg" required className="w-full bg-transparent border-b border-gray-500 p-2 mb-4 outline-none" />
                <label htmlFor="email" className="uppercase text-xs mb-2 block">Email</label>
                <input type="email" id="email" name="email" placeholder="Adresa email" required className="w-full bg-transparent border-b border-gray-500 p-2 mb-4 outline-none" />
                <label htmlFor="email" className="uppercase text-xs mb-2 block">Telefon</label>
                <input type="tel" id="telefon" name="telefon" placeholder="Numar telefon" required className="w-full bg-transparent border-b border-gray-500 p-2 mb-4 outline-none" />
                <label htmlFor="message" className="uppercase text-xs mb-2 block">Mesaj</label>
                <textarea rows={6} placeholder="Mesajul tau aici" id="message" name="message" required className="w-full bg-transparent border-b border-gray-500 p-2 mb-4 outline-none resize-none"></textarea>
                <Button variant={"secondary"} type="submit" id="submit" name="submit">Trimite</Button>
            </form>
            <div id="error" className="w-full mt-2 text-xs uppercase"></div>
            <div id="success-msg" className="w-full mt-2 text-xs uppercase"></div>
        </div>
    )
}