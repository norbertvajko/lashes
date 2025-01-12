import { Button } from "@/components/ui/button";
import { ItemsCounter } from "./items-counter";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { BsInfoCircleFill } from "react-icons/bs";
import { Alert, AlertTitle } from "../ui/alert";
import { CartItem } from "./cart-item";
import { CiLogin } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";

interface FavoritesButtonProps {
    favCount: number;
    className?: string;
}

export const FavoritesButton = (props: FavoritesButtonProps) => {
    const { favCount, className } = props;

    return (
        <div className={cn("cursor-pointer flex flex-row", className)}>
            <Sheet>
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
                   
                </SheetContent>
            </Sheet>
        </div>
    )
}
