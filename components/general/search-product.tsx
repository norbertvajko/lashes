// import { AutoComplete } from "@/components/ui/autocomplete"
// import React from "react";
// import {
//     PulseLoader
// } from "react-spinners";
// // import { COURSES_LIST } from "./courses-component";
// import { MOCK_POSTS_DATA } from "@/data/products-mock-data";
// import { useRouter } from "next/navigation";
// import { APP_ROUTES } from "@/constants/routes";

// interface SearchProductProps {
//     onFocus?: () => void;
//     onBlur?: () => void;
// }

// // const opts = COURSES_LIST.map(cat => ({
// //     value: cat.title,
// //     label: cat.title
// // }));

// const prods = MOCK_POSTS_DATA.map(prod => ({
//     value: prod.id,
//     label: prod.title
// }))

// export const SearchProduct = (props: SearchProductProps) => {
//     const { onFocus, onBlur } = props;

//     const router = useRouter();

//     return (
//         <AutoComplete
//             onValueChange={(val) => {
//                 router.push(`${APP_ROUTES.PRODUCT}/${val.value}`);
//             }}
//             placeholder={"Cauta produs"}
//             className={"w-full sm:w-[520px] lg:w-[632px]"}
//             onFocus={onFocus}
//             onBlur={onBlur}
//             options={prods} 
//             emptyMessage={<PulseLoader className="py-3 px-3" color="#F2CE00" />}
//         />
//     )
// }