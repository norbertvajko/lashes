import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Ratings } from "./ratings";

interface RatingReviewsProps {
    className?: string;
    ratingScore: number;
    onlyBadge?: boolean;
    onlyStars?: boolean;
    onClick?: () => void;
    badgeClassName?: string;
    noOfReviews?: number;
}

export const RatingReviews: React.FC<RatingReviewsProps> = (props) => {
    const { ratingScore, onlyBadge, onlyStars, onClick, className, badgeClassName, noOfReviews } = props;

    if (onlyBadge) {
        return (
            <Badge onClick={onClick} className="bg-yellow-500 text-black">{ratingScore.toFixed(1)}</Badge>
        );
    }

    if (onlyStars) {
        return (
            <Ratings onClick={onClick} rating={ratingScore} variant="yellow" totalstars={5} />
        );
    }

    return (
        <div className={cn("flex items-center pt-2 cursor-pointer gap-5", className)}>
            <Ratings onClick={onClick} rating={ratingScore} variant="yellow" totalstars={5} />
            <Badge onClick={onClick} className={cn("ml-auto bg-orange-400 text-white", badgeClassName)}>
                {noOfReviews ? `${ratingScore.toFixed(1)} | ${noOfReviews} review-uri` : `${ratingScore.toFixed(1)}`}
            </Badge>
        </div>
    );
}
