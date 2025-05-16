import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa6";

interface CartItemProps {
    image?: string;
    title: string;
    price: string;
    quantity?: number;
    onIncrementValue?: () => void;
    onDecrementValue?: () => void;
    onRemoveItem?: () => void;
    onAddToCart?: () => void;
}

export const CartItem = (props: CartItemProps) => {
    const { image, title, price, quantity, onIncrementValue, onDecrementValue, onRemoveItem, onAddToCart } = props;

    const [itemAmountValue, setItemAmountValue] = useState<number>(quantity ?? 0);

    const incrementItemAmountValue = () => {
        onIncrementValue && onIncrementValue();
        setItemAmountValue((prev) => {
            const updatedQuantity = prev + 1;

            return updatedQuantity;
        });
    }

    const decrementItemAmountValue = () => {
        if (itemAmountValue > 1) {
            onDecrementValue && onDecrementValue();
            setItemAmountValue((prev) => {
                const updatedQuantity = prev - 1;

                return updatedQuantity;
            });
        }
    }

    const totalPrice = quantity ? (parseFloat(price) * itemAmountValue).toFixed(0) : parseFloat(price).toFixed(0);

    return (
        <div className="flex flex-row">
            <div className="relative">
                <img
                    className={quantity ? "rounded-md w-[109px] h-[62px] object-contain" : "object-contain rounded-md w-[109px] h-[62px]"}
                    src={image || ""}
                    alt={"course-item-img"}
                />
                <IoCloseCircleSharp onClick={() => { onRemoveItem && onRemoveItem() }} className="absolute right-[-9px] top-[-8px] text-black dark:text-white dark:bg-black dark:rounded-full cursor-pointer" role="button" size={18} />
            </div>
            <p className={"pl-3 pr-3 text-[0.62rem] w-full font-semibold h-[45px] overflow-hidden"}>
                {title}
            </p>
            <div className="flex flex-col w-[115px] items-end gap-2">
                <span className={"text-[0.62rem] font-semibold text-nowrap"}>{totalPrice} RON</span>
                {!quantity && (
                    <Button size={"icon"} variant={"primary"} onClick={() => onAddToCart && onAddToCart()}>
                        <FaCartPlus />
                    </Button>
                )}
                {/* {quantity && (
                    <div className="flex flex-row border w-[63px] h-[24px] items-center rounded-md mt-2">
                        <Button disabled={itemAmountValue === 1} onClick={decrementItemAmountValue} variant="icon" size="icon">
                            <FaMinus className="h-3 w-3" />
                        </Button>
                        <input type="button" autoFocus={false} value={itemAmountValue} onChange={() => { }} className="outline-none border-none w-[16px] bg-transparent text-sm font-semibold" />
                        <Button onClick={incrementItemAmountValue} variant="icon" size="icon">
                            <FaPlus className="h-3 w-3" />
                        </Button>
                    </div>
                )} */}
            </div>
        </div>
    )
}