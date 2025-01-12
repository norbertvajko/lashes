import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { FaCartShopping } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { convertToTitleCase } from "@/utils/str-utils";
import { MdFavorite } from "react-icons/md";
import { RatingReviews } from "./rating-reviews";
import { BsCartCheckFill } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import Image from "next/image";


export interface ProductCardProps {
    className?: string;
    id: string;
    title: string;
    images?: string | string[];
    price: string;
    description: string;
    hasOfferBadge?: boolean;
    promoPrice?: number;
    ratingScore?: number;
    addToFavorites?: () => void;
    onAddToCart?: () => void;
    onGoToPageDetails?: () => void;
    isItemInCart?: boolean;
    isItemInFavorites?: boolean;
}

export const ProductCard = (props: ProductCardProps) => {
    const {
        className,
        id,
        title,
        images,
        price,
        description,
        promoPrice,
        hasOfferBadge,
        addToFavorites,
        onAddToCart,
        ratingScore,
        onGoToPageDetails,
        isItemInCart,
        isItemInFavorites
    } = props;

    return (
        <Card key={id} className={cn("relative flex max-w-xs flex-col overflow-hidden rounded-md border border-md shadow-md w-[320px] h-[511px]", className)}>
            <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-md border">
                <Button
                    variant={"icon"}
                    className="absolute right-3 top-3 p-0"
                    onClick={() => {
                        addToFavorites && addToFavorites();
                    }}>
                    {isItemInFavorites ?
                        <MdFavorite className="text-red-500 cursor-pointer z-50" size={24} /> :
                        <IoMdHeartEmpty className="text-red-500 cursor-pointer z-50 hover:scale-125" size={24} />
                    }
                </Button>
                {hasOfferBadge ? (
                    <Badge onClick={() => onGoToPageDetails && onGoToPageDetails()} variant={"black"} className="w-fit absolute top-3 left-3 z-50">
                        <span>{promoPrice}% REDUCERE</span>
                    </Badge>
                ) : (null)}
                <Image
                    className="object-contain w-full hover:scale-110 cursor-pointer p-4"
                    src={images?.[0] ?? ''}
                    alt="product-image"
                    onClick={() => onGoToPageDetails && onGoToPageDetails()}
                />
            </div>
            <div className="pt-4 px-4 pb-5">
                <RatingReviews ratingScore={ratingScore ?? 0} onClick={() => onGoToPageDetails && onGoToPageDetails()} />
                <h5 onClick={() => onGoToPageDetails && onGoToPageDetails()} className="text-base cursor-pointer font-bold text-primary tracking-tighter leading-4 py-4" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '63px' }}>{convertToTitleCase(title)}</h5>
                <div className="flex flex-col pt-5">
                    <div className="mt-2 pb-5 flex items-center justify-between">
                        <span className="text-2xl font-bold text-nowrap">{price} RON</span>
                    </div>
                    <Button variant="default" className="gap-2 w-full before:ease relative h-12 overflow-hidden border border-black bg-black text-white transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-black hover:before:-translate-x-60" onClick={() => {
                        onAddToCart && onAddToCart();
                    }}>
                        {isItemInCart ? <BsCartCheckFill /> : <FaCartShopping />}
                        {isItemInCart ? "Adaugat" : "Adauga in cos"}
                    </Button>
                </div>
            </div>
        </Card>
    )
}