import { RatingReviews } from "./rating-reviews"
import Image from "next/image";

interface TestimonialsProps {
    userName: string;
    userAvatar: string;
    userRating: number;
    userDescription: string;
}

export const TestimonialsCard = (props: TestimonialsProps) => {
    const { userName, userAvatar, userRating, userDescription } = props;

    return (
        <div className="mb-6 lg:mb-0">
            <div
                className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex">
                    <div
                        className="relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                        data-te-ripple-init data-te-ripple-color="light">
                        <Image alt="user-avatar" src={userAvatar} className="w-full" />
                        <a href="#!">
                            <div
                                className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                            </div>
                        </a>
                    </div>
                </div>
                <div className="p-6">
                    <h5 className="mb-2 text-lg font-bold">{userName}</h5>
                    <div className="flex items-center justify-center py-2">
                        <RatingReviews ratingScore={userRating} onlyStars />
                    </div>
                    <p>
                        {userDescription}
                    </p>
                </div>
            </div>
        </div>
    )
}