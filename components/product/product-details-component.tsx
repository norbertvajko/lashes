import { RatingReviews } from "@/components/general/rating-reviews";

interface ProductDetailsComponentProps {
    title: string;
    ratingScore: number;
}

export const ProductDetailsComponent = (props: ProductDetailsComponentProps) => {
    const { title, ratingScore } = props;

    return (
        <div className="flex flex-col w-full md:w-[350px] lg:w-[450px] xl:w-[550px] 2xl:w-[660px] px-6 pt-3">
            <h1 className="text-md xl:text-lg font-bold">{title}</h1>
            <RatingReviews className="gap-5 justify-between sm:justify-normal" badgeClassName="ml-2" ratingScore={ratingScore} noOfReviews={45} />
        </div>
    )
}