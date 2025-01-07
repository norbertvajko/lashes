import { Button } from "@/components/ui/button";
import { ItemsCounter } from "./items-counter";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { BsInfoCircleFill } from "react-icons/bs";
import { Alert, AlertTitle } from "../ui/alert";
import { CartItem } from "./cart-item";
import { useFavorites } from "@/context/favorites-context";
import { useCart } from "@/context/cart-context";
import { useUser } from "@/context/user-context";
import { LoginButton } from "../auth/login-button";
import { CiLogin } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";

interface FavoritesButtonProps {
    favCount: number;
    className?: string;
}

export const FavoritesButton = (props: FavoritesButtonProps) => {
    const { favCount, className } = props;

    const { itemsLength: favoritesItemLength, items: favoriteItems, removeFromFavorites, openSheet, setOpenSheet } = useFavorites();

    const { addToCart } = useCart();

    const { user } = useUser();

    return (
        <div className={cn("cursor-pointer flex flex-row", className)}>
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger asChild>
                    <div>
                        <Button variant={"icon"} className="relative text-white flex items-center rounded-full text-center p-3">
                            <FaRegHeart size={28} className="bg-gradient-to-br from-red-400 to-pink-400 hover:bg-gradient-to-bl rounded-full p-1 font-bold" />
                            <ItemsCounter counter={favCount} />
                        </Button>
                    </div>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] z-[9999999999] flex flex-col overflow-y-auto">
                    <p className="text-lg font-bold">Favorite</p>
                    {!user && (
                        <>
                            <Alert>
                                <BsInfoCircleFill className="h-4 w-4" />
                                <AlertTitle className="pb-1.5 pt-0.5 text-md font-semibold">Trebuie sa fii autentificat pentru a putea adauga la favorite</AlertTitle>
                            </Alert>
                            <LoginButton mode={"modal"} asChild>
                                <Button className="p-0 gap-2" color="#15803D" variant={"link"} size={"lg"}>
                                    <CiLogin size={20} />
                                    Login
                                </Button>
                            </LoginButton>
                        </>
                    )}
                    {favoritesItemLength === 0 && user ? (
                        <>
                            <Alert>
                                <BsInfoCircleFill className="h-4 w-4" />
                                <AlertTitle className="pb-1.5 pt-0.5 text-md font-semibold">Nu ai nici un produs la favorite</AlertTitle>
                            </Alert>
                        </>
                    ) : (
                        <>
                            {favoriteItems.map((item, index) => (
                                <div key={`${item.title}-${index}`}>
                                    <CartItem
                                        key={index}
                                        title={item.title}
                                        // image={item?.images?.[0] ?? ""}
                                        price={item.price ?? ""}
                                        onRemoveItem={() => {
                                            removeFromFavorites(item.title);
                                        }}
                                        onAddToCart={() => {
                                            addToCart(item);
                                        }}
                                    />
                                    <Separator className="mt-2" />
                                </div>
                            ))}
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}
