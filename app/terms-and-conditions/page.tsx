import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-8">Termeni si conditii</h1>
                <p className="text-gray-600 mb-8 text-center">
                    Ultimul update: {new Date().toLocaleDateString()}
                </p>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>1. Acceptarea Termenilor</AccordionTrigger>
                        <AccordionContent>
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>2. Descrierea Serviciului</AccordionTrigger>
                        <AccordionContent>
                            Our website provides users with access to a rich collection of resources, including various communications tools, forums, shopping services, personalized content, and branded programming through its network of properties which may be accessed through any various medium or device now known or hereafter developed.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>3. Modificări ale Termenilor</AccordionTrigger>
                        <AccordionContent>
                            We reserve the right to change these terms and conditions at any time. Your continued use of our website following any changes indicates your acceptance of the new terms. It is your responsibility to regularly check for updates to these terms.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>4. Politica de Confidențialitate</AccordionTrigger>
                        <AccordionContent>
                            Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms and Conditions, discloses how we collect and use your personal information. By using our website, you consent to the collection and use of your personal information as described in our Privacy Policy.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>5. Conduita Utilizatorului</AccordionTrigger>
                        <AccordionContent>
                            You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content or disrupting the normal flow of dialogue within our website.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="mt-12 text-center">
                    <p className="mb-4 text-gray-600">
                        By using our services, you agree to these terms and conditions.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button variant="outline">
                            <Link href="/">Nu accept</Link>
                        </Button>
                        <Button>
                            <Link href="/">Accept</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}