import { useEffect, useRef } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface CategoriesBreadcrumbProps {
    mainCategory: string;
    subCategory: string;
    subSCategory: string;
}

export const CategoriesBreadcrumb = (props: CategoriesBreadcrumbProps) => {
    const { mainCategory, subCategory, subSCategory } = props;
    const breadcrumbRef = useRef<HTMLDivElement>(null);

    const breadcrumbItems = [
        { label: mainCategory, href: `/${mainCategory}` },
        { label: subCategory, href: `/${mainCategory}` },
        { label: subSCategory, href: `/${subSCategory}` },
    ];

    const BreadcrumbComponentItem = ({ label, href, isLast }: { label: string; href: string; isLast: boolean }) => {
        return (
            <>
                <BreadcrumbItem className="flex items-center text-nowrap">
                    <BreadcrumbLink href={href}>
                        {label}
                    </BreadcrumbLink>
                    {isLast ? null : <BreadcrumbSeparator />}
                </BreadcrumbItem>
            </>
        );
    };

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (breadcrumbRef.current) {
                breadcrumbRef.current.scrollLeft += event.deltaY;
                event.preventDefault();
            }
        };

        const breadcrumbElement = breadcrumbRef.current; // Copiem valoarea ref într-o variabilă locală

        if (breadcrumbElement) {
            breadcrumbElement.addEventListener('wheel', handleScroll);
        }

        return () => {
            if (breadcrumbElement) {
                breadcrumbElement.removeEventListener('wheel', handleScroll);
            }
        };
    }, []); // Dependențele rămân neschimbate, deoarece ref-ul este deja stabilit la început

    return (
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }} ref={breadcrumbRef}>
            <style jsx>{`
                .overflow-x-auto::-webkit-scrollbar {
                    display: none; /* Hide scrollbar for Webkit browsers */
                }
            `}</style>
            <Breadcrumb className="text-[#666666] font-semibold flex items-center">
                <BreadcrumbList className="flex-nowrap">
                    {breadcrumbItems.map((item, index) => (
                        <BreadcrumbComponentItem
                            key={index}
                            label={item.label}
                            href={item.href}
                            isLast={index === breadcrumbItems.length - 1}
                        />
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
