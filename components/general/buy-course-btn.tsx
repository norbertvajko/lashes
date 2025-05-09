import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/app/courses/exclusive/page";
import { CONST_ADVANCE_PAYMENT_PRICE, CONST_EXCLUSIVE_COURSE_PRICE, CONST_EXCLUSIVE_COURSE_RATES_PRICE, CONST_STANDARD_COURSE_PRICE, CONST_STANDARD_COURSE_RATES_PRICE } from "@/constants/courses/data";
import { usePathname } from "next/navigation";

interface BuyCourseButtonProps {
    session: { isSignedIn: boolean };
    isLoading: boolean;
    handleIntegralPay: (product: Product) => Promise<void>;
    handleRatePay: (product: Product) => Promise<void>;
    product: Product;
}

const BuyCourseButton: React.FC<BuyCourseButtonProps> = ({
    session,
    isLoading,
    handleIntegralPay,
    handleRatePay,
    product,
}) => {
    const [open, setOpen] = useState(false);

    const pathname = usePathname();

    const isStandardCourse = pathname === "/courses/standard";
    const isExclusiveCourse = pathname === "/courses/exclusive";
    
    let integralPrice: number = 0;
    let courseRatePrice: number = 0;
    
    if (isStandardCourse) {
        integralPrice = CONST_STANDARD_COURSE_PRICE;
        courseRatePrice = CONST_STANDARD_COURSE_RATES_PRICE;
    } 
    
    if (isExclusiveCourse) {
        integralPrice = CONST_EXCLUSIVE_COURSE_PRICE;
        courseRatePrice = CONST_EXCLUSIVE_COURSE_RATES_PRICE;
    }

    const handleButtonClick = () => {
        if (!session.isSignedIn) {
            toast.warning("Trebuie să fii autentificat pentru a putea achiziționa acest curs");
        } else {
            setOpen(true);
        }
    };

    // Funcția pentru procesarea plății în funcție de opțiunea aleasă
    const handleOption = (paymentMethod: "integral" | "rate") => {
        setOpen(false); // Închide modalul după ce se alege opțiunea

        // Logica de plată în funcție de metoda aleasă
        if (paymentMethod === "integral") {
            handleIntegralPay(product);
        } else if (paymentMethod === "rate") {
            handleRatePay(product);
        }
    };

    return (
        <>
            {/* Butonul principal pentru cumpărare */}
            <Button
                onClick={handleButtonClick}
                disabled={isLoading}
                className="flex items-center justify-center"
            >
                <i className="bx bxs-zap"></i> Cumpără acum
            </Button>

            {/* Modalul pentru alegerea metodei de plată */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="px-2.5 md:px-8">
                    <DialogHeader>
                        <DialogTitle>Alege tipul de plată</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 mt-4">
                        {/* Opțiunea pentru plata integrală */}
                        <Button
                            variant="outline"
                            className="justify-between"
                            onClick={() => handleOption("integral")}
                        >
                            Plata integrală – {integralPrice} RON ({CONST_ADVANCE_PAYMENT_PRICE} RON avans)
                        </Button>

                        {/* Opțiunea pentru plata în rate */}
                        <Button
                            variant="outline"
                            className="justify-between"
                            onClick={() => handleOption("rate")}
                        >
                            Plata în 3 rate – {courseRatePrice} RON ({CONST_ADVANCE_PAYMENT_PRICE} RON avans)
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BuyCourseButton;
