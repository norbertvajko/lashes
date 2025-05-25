import { useState, useEffect } from "react";

type PromoCode = {
  id: number;
  code: string;
  discount: number | null;
  expired: boolean;
  createdAt: string;
  userId: string;
};

export function useUserPromoCode() {
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPromoCode() {
      setLoading(true);
      try {
        const res = await fetch("/api/user/orders/promo-code");
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch promo code");
        }
        const data = await res.json();
        setPromoCode(data.promoCode);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPromoCode();
  }, []);

  return { promoCode, loading, error };
}