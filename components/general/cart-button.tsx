"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { IoCartOutline } from "react-icons/io5";
import { ItemsCounter } from "./items-counter";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "./cart-item";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BsInfoCircleFill } from "react-icons/bs";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

interface CartButtonProps {
    itemsCount: number;
    className?: string;
}

export const CartButton = (props: CartButtonProps) => {
    const { itemsCount, className } = props;
    const { items, incrementQuantity, decrementQuantity, itemsLength, removeFromCart, openSheet, setOpenSheet } = useCart();

    const cartItems = items ? [...items] : [];
    const cartItemsLength = itemsLength;

    const taxesValue = 0;
    const transportValue = 0;

    const totalPrice = (cartItems.reduce((acc, product) => {
        return acc + (parseFloat(product.price ?? "") * product.quantity);
    }, 0) + transportValue).toFixed(2);

    const router = useRouter();

    return (
        <div className={cn("cursor-pointer flex flex-row ", className)}>
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger asChild>
                    <div className="flex items-center justify-center gap-2">
                        <Button variant={"icon"} className="relative text-white flex items-center rounded-full text-center p-3">
                            <IoCartOutline size={28} className="bg-gradient-to-br from-blue-500 to-sky-400 hover:bg-gradient-to-bl rounded-full p-1 font-bold" />
                            <ItemsCounter counter={itemsCount} />
                        </Button>
                    </div>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] z-[9999999999] flex flex-col overflow-y-auto">
                    <p className="text-lg font-bold ">Cosul meu</p>
                    {cartItemsLength === 0 ? (
                        <>
                            <Alert>
                                <BsInfoCircleFill className="h-4 w-4" />
                                <AlertTitle className="pb-1.5 pt-0.5 text-md font-semibold">Nu ai nici un produs in cos</AlertTitle>
                                <AlertDescription>
                                    <p className="text-[12px] text-xs">
                                        Cosul tau de cumparaturi  nu contine produse. Pentru a adauga produse in cos te rugam sa te intorci in magazin.
                                    </p>
                                </AlertDescription>
                            </Alert>
                        </>
                    ) : (
                        <>
                            {cartItems.map((item, index) => (
                                <div key={`${item.title}-${index}`}>
                                    <CartItem
                                        key={index}
                                        title={item.title}
                                        price={item.price ?? ""}
                                        // image={item.image ?? ""}
                                        quantity={item.quantity}
                                        onIncrementValue={() => {
                                            incrementQuantity(item.title);
                                        }}
                                        onDecrementValue={() => {
                                            decrementQuantity(item.title);
                                        }}
                                        onRemoveItem={() => {
                                            removeFromCart(item.title);
                                        }}
                                    />
                                    <Separator className="mt-2" />
                                </div>
                            ))}
                            <div className="flex flex-col mt-auto gap-2">  {/*mt-auto pushes this element to the bottom */}
                                <div className="flex flex-row items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-500">Taxe</p>
                                    <span className="text-md font-bold">{taxesValue.toFixed(2)} RON</span>
                                </div>
                                <Separator />
                                <div className="flex flex-row items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-500">Transport</p>
                                    <span className="text-md font-bold ">{transportValue.toFixed(2)} RON</span>
                                </div>
                                <Separator />
                                <div className="flex flex-row items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-500">Total</p>
                                    <span className="text-md font-bold ">{totalPrice} RON</span>
                                </div>
                                <Separator />
                                <div className="pt-3">
                                    <Button onClick={() => router.push("https://buy.stripe.com/test_3cs5kneOF7tM39C000")} className="w-full">
                                        Continua plata
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
};
