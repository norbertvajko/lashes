"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoReturnDownBack } from "react-icons/io5";
import { FC } from "react";

interface BackButtonProps {
  variant?: "default" | "outline";
}

const allowedVariants = ["default", "outline"] as const;

export const BackButton: FC<BackButtonProps> = ({ variant = "default" }) => {
  const router = useRouter();

  // Asigură-te că variant este una acceptată
  const safeVariant: "default" | "outline" = allowedVariants.includes(variant)
    ? variant
    : "default";

  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <Button
        variant={safeVariant}
        className="rounded-full flex items-center justify-center"
        onClick={handleBackButtonClick}
        aria-label="Înapoi"
      >
        <IoReturnDownBack size={20} />
      </Button>
    </div>
  );
};
