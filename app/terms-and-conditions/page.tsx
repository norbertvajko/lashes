"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TermsAndConditions() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleAccept = async () => {
        setLoading(true);
        setError(null);

        try {
            // Send POST request to your backend API
            const response = await axios.post("/api/user/terms-and-conditions", {});

            if (response.status === 200) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/");
                }, 1000);
            }
        } catch (err) {
            // Type check the error to handle it safely
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || "An error occurred");
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-8">Termeni si conditii</h1>
                <p className="text-gray-600 mb-8 text-center">
                    Ultimul update: 1/21/2025
                </p>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>1. Definitii generale</AccordionTrigger>
                        <AccordionContent>
                            <b>1.1 SERVICIU</b> – serviciul de comert electronic condus exclusiv pe portiunile public disponibile ale SITE-ULUI, in sensul acordarii posibilitatii CLIENTULUI sa contracteze produse si/sau servicii folosind mijloace exclusiv electronice.<br /><br />

                            <b>1.2 UTILIZATOR</b> – persoana fizica sau juridica de drept public sau privat care are sau obtine acces la CONTINUT, prin orice mijloc de comunicare (electronic, telefonic, etc) sau in baza unui acord de utilizare intre LL LASHES SRL si acesta.<br /><br />

                            <b>1.3 CONT</b> – ansamblul format dintr-o adresa de e-mail si o parola care permit unui singur UTILIZATOR accesul la zone restrictionate ale SITE-ULUI prin care se face accesul la SERVICIU.<br /><br />

                            <b>1.4 CLIENT</b> – Persoana fizica sau juridica de drept public sau privat care are sau obtine acces la CONTINUT si SERVICIU, prin orice mijloc sau in baza unui acord de utilizare intre LL LASHES SRL si acesta, sau persoana fizica sau juridica care beneficiaza de pe urma produselor si/sau serviciilor oferite de LL LASHES SRL si achizitionate de catre acesta prin folosirea SERVICIULUI.<br /><br />

                            <b>1.5 DOCUMENT</b> – prezentele Termeni si Conditii<br /><br />

                            <b>1.6 BULETIN</b> INFORMATIV / NEWSLETTER – mijlocul de informare periodic, exclusiv electronic, asupra produselor, serviciilor si/sau promotiilor desfasurate de catre LL LASHES SRL intr-o anumita perioada, fara nici un angajament din partea LL LASHES SRL cu referire la informatiile continute de acesta.<br /><br />

                            <b>1.7 TRANZACTIE</b> – incasare sau rambursare a unei sume rezultata din vanzarea unui produs / serviciu de catre LL LASHES SRL catre Client indiferent de modalitatea de livrare. <br /><br />

                            <b>1.8 CONTRACT la distanta</b> – conform definitiei cuprinse in Ordonanta de urgenta a Guvernului nr. 34/2014.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>2. Politica generala</AccordionTrigger>
                        <AccordionContent>
                            <b>2.1</b> Acest document stabileste termenii si conditiile de utilizare ai site-ului/continutului/serviciului de catre utilizator sau client, in cazul in care acesta nu dispune de un alt acord de utilizare valid, incheiat intre LL LASHES SRL, str. Piersicilor 23, jud Arad, Arad.<br /><br />
                            <b>2.2</b> Accesul la serviciu se face exclusiv prin accesarea site-ului public www.ll-lashes.ro<br /><br />
                            <b>2.3</b> Folosirea, inclusiv dar nelimitandu-se la accesarea, vizitarea si vizualizarea, continutului/serviciului, implica aderarea utilizatorului sau clientului la prezentele termene si conditii in afara de cazul in care continutul respectiv nu are conditii de folosire distinct formulate.<br /><br />
                            <b>2.4</b> Prin folosirea site-ului/continutului/serviciului, Utilizatorul sau Clientul este singurul responsabil pentru toate activitatile care decurg prin folosirea acestuia.<br /><br />
                            <b>2.5</b> De asemenea, acesta raspunde pentru orice daune materiale, intelectuale sau electronice sau de orice alta natura produse site-ului, continutului, serviciului, LL LASHES SRL sau oricarui tert cu care LL LASHES SRL are incheiate contracte, in conformitate cu legislatia romana in vigoare.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>3. Drept de proprietate intelectuala</AccordionTrigger>
                        <AccordionContent>
                            <b>3.1</b> Continutul informativ/imagistic prezentat pe site este PROPRIETATEA INTELECTUALA a LL LASHES SRL.<br /><br />
                            <b>3.2</b> Nici un continut transmis catre Utilizator sau Client, prin orice mijloc de comunicare sau dobandit de acesta prin accesare, vizitare si/sau vizualizare nu constituie o obligatie contractuala din partea LL LASHES SRL si/sau al angajatului LL LASHES SRL care a mijlocit transferul de continut, in cazul in care aceasta exista, fata de respectivul continut.<br /><br />
                            <b>3.3</b> Orice utilizare a continutului in alte scopuri decat cele permise expres prin prezentul document este interzisa..<br /><br />
                            <b>3.4</b> Continutul acestui site nu poate fi utilizat, reprodus, distribuit, transmis, expus, in alte scopuri decat cele expres si legal permise. Extragerea oricaror informatii urmata de orice utilizare in scop comercial care depaseste sfera copiei private reglementate de lege sau pentru vanzare ori licentiere si fara a avea in prealabil un consimtamant scris al titularilor drepturilor de proprietate constituie o incalcare a termenilor si conditiilor.<br /><br />
                            <b>3.5</b> Sunteti de asemenea de acord sa nu afectati si interferati in vreun fel cu elementele de securitate ale site-ului, cu elementele care previn sau restrictioneaza utilizarea, copierea unui continut sau elementele care intaresc limitele de utilizare a siteului sau a continutului acestuia.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>4. Politica de vanzare on-line</AccordionTrigger>
                        <AccordionContent>
                            <b>4.1</b> Accesul la serviciu este permis oricarui utilizator care poseda sau isi creeaza un cont.<br /><br />
                            <b>4.2</b> Pentru a i se permite accesul la serviciu, Utilizatorul va trebui sa accepte prevederile prezentului document.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>5. Valabilitatea si confirmarea comenzilor</AccordionTrigger>
                        <AccordionContent>
                            <b>5.1</b> LL LASHES SRL isi rezerva dreptul de a modifica tarifele practicate pentru produsele si/sau serviciile disponibile pe site fara notificarea prealabila a Utilizatorului / Clientului.<br /><br />
                            <b>5.2</b> Pretul de achizitie al produselor sau serviciilor dintr-o comanda emisa nu se poate modifica la un moment ulterior emiterii acesteia decat cu acordul partilor.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger>6. Garantie</AccordionTrigger>
                        <AccordionContent>
                            <b>6.1</b> Clientul este obligat sa-si insuseasca si sa respecte indicatiile de utilizare a produselor.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="mt-12 text-center">
                    <p className="mb-4 text-gray-600">
                        Prin utilizarea serviciilor noastre, sunteți de acord cu acești termeni și condiții.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <div>
                            <Button
                                onClick={handleAccept}
                                disabled={loading}
                                className="px-4 py-2 disabled:opacity-50"
                            >
                                {loading ? "Validare..." : "Accept"}
                            </Button>

                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            {success && <p className="text-green-500 mt-2">Termenii au fost acceptați cu succes!</p>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}