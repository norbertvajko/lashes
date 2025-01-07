"use client";

import { useEffect, useState } from 'react';

interface ItemsCounterProps {
    counter: number;
}

export const ItemsCounter = (props: ItemsCounterProps) => {
    const { counter } = props;
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        <span
            className="absolute right-[4px] top-[-2px] text-xs font-semibold rounded-full bg-black w-[17px] h-[17px] border border-slate-500 text-white z-50"
        >
            {hydrated ? counter : 0}
        </span>
    )
};