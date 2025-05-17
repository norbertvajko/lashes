import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/app/courses/exclusive/page";
import {
  CONST_ADVANCE_PAYMENT_PRICE,
  CONST_EXCLUSIVE_COURSE_PRICE,
  CONST_EXCLUSIVE_COURSE_RATES_PRICE,
  CONST_STANDARD_COURSE_PRICE,
  CONST_STANDARD_COURSE_RATES_PRICE,
} from "@/constants/courses/data";
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

  // Memoized price logic with default fallback values
  const { integralPrice, courseRatePrice } = useMemo(() => {
    if (pathname === "/courses/standard") {
      return {
        integralPrice: CONST_STANDARD_COURSE_PRICE ?? 0,
        courseRatePrice: CONST_STANDARD_COURSE_RATES_PRICE ?? 0,
      };
    }

    if (pathname === "/courses/exclusive") {
      return {
        integralPrice: CONST_EXCLUSIVE_COURSE_PRICE ?? 0,
        courseRatePrice: CONST_EXCLUSIVE_COURSE_RATES_PRICE ?? 0,
      };
    }

    return { integralPrice: 0, courseRatePrice: 0 };
  }, [pathname]);

  const handleButtonClick = () => {
    if (!session?.isSignedIn) {
      toast.warning("Trebuie să fii autentificat pentru a putea achiziționa acest curs");
    } else {
      setOpen(true);
    }
  };

  const handleOption = (paymentMethod: "integral" | "rate") => {
    setOpen(false);
    if (paymentMethod === "integral") {
      handleIntegralPay(product);
    } else {
      handleRatePay(product);
    }
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        disabled={isLoading}
        className="flex items-center justify-center"
      >
        <i className="bx bxs-zap"></i> Cumpără acum
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="px-2.5 md:px-8">
          <DialogHeader>
            <DialogTitle>Alege tipul de plată</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            <Button
              variant="outline"
              className="justify-between"
              onClick={() => handleOption("integral")}
            >
              Plata integrală – {integralPrice} RON ({CONST_ADVANCE_PAYMENT_PRICE ?? 0} RON avans)
            </Button>

            <Button
              variant="outline"
              className="justify-between"
              onClick={() => handleOption("rate")}
            >
              Plata în 3 rate – {courseRatePrice} RON ({CONST_ADVANCE_PAYMENT_PRICE ?? 0} RON avans)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyCourseButton;