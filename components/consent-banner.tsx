"use client";

interface ConsentBannerProps {
    children: React.ReactNode;
};

export const ConsentBanner = (props: ConsentBannerProps) => {
    const { children } = props;

    return (
        <span>
            {children}
        </span>
    )
}