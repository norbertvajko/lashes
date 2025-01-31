"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import newsletterImg from "../../assets/images/newsletter-img.png";
import { LoadingSpinner } from "./loading-spinner";

export const NewsletterComponent = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async () => {
    if (!email) {
      toast.warning("Te rugăm să introduci o adresă de e-mail validă.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/emails/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "A apărut o eroare. Încearcă din nou.");
      } else {
        toast.success("🎉 Te-ai abonat cu succes! Verifică inbox-ul pentru confirmare.");
        setEmail("");
      }
    } catch (error) {
      toast.error("Eroare de conexiune! Încearcă mai târziu.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      {/* Newsletter Section */}
      <div className="bg-black relative mt-4 sm:mt-8">
        <section className="mb-16 text-center lg:text-left">
          <div className="py-12 md:px-12">
            <div className="container mx-auto xl:px-32">
              <div className="grid items-center grid-cols-1 lg:grid-cols-2">
                {/* Left Content */}
                <div className="mb-12 lg:mb-0 lg:mr-12">
                  <div className="relative z-10 block rounded-lg bg-opacity-50 bg-gray-200 dark:bg-opacity-50 dark:bg-gray-800 px-6 py-12 shadow-md backdrop-blur-md md:px-12 lg:-mr-14">
                    <h1 className="mt-0 mb-12 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl text-white">
                      Abonează-te și primești lunar oferte
                      <span className="text-yellow-600"> direct pe email!</span>
                    </h1>
                    <div className="mb-6 flex flex-col md:flex-row">
                      <input
                        type="email"
                        className="peer block w-full min-h-[auto] rounded border-0 bg-transparent py-2 px-3 leading-normal outline-none transition duration-200 ease-linear placeholder-opacity-0 peer-focus:text-white text-white dark:focus:text-primary dark:peer-focus:text-primary"
                        placeholder="Adresa e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant={"primary"}
                        onClick={subscribe}
                        disabled={isLoading}
                        className={`inline-flex items-center justify-center mt-3 md:mt-0 rounded px-6 py-2 font-semibold ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isLoading ? <LoadingSpinner /> : "Abonează-te"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div>
                  <img
                    src={newsletterImg.src}
                    className="w-full rounded-lg shadow-lg transform rotate-6"
                    alt="Newsletter"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
