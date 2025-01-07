'use client';

import { WhatsappShareButton, WhatsappIcon } from "react-share";

export const WhatsappContact = () => {
    const phoneNumber = "40755015816"; 
    const message = "Buna! 🥰"; 

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-5 left-5 z-50">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon size={50} round className="hover:scale-110 transition-transform duration-200" />
            </a>
        </div>
    )
}
