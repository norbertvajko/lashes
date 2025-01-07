// "use client";

// import { Carousel, CarouselContent } from "@/components/ui/carousel"
// import Autoplay from "embla-carousel-autoplay"
// import React from "react"
// import { MOCK_POSTS_DATA } from "@/data/products-mock-data";
// import { ProductCard } from "./product-card";
// import { useCart } from "@/context/cart-context";
// import { useFavorites } from "@/context/favorites-context";
// import { useRouter } from "next/navigation";
// import { APP_ROUTES } from "@/constants/routes";

// const ProductsCardSlider = () => {
 
//     const { addToCart, isItemInCart} = useCart();
//     const { addToFavorites, isItemInFavorites } = useFavorites();
//     const router = useRouter();

//     const plugin = React.useRef(
//         Autoplay({ delay: 10500, stopOnInteraction: true })
//     )

//     return (
//         <Carousel
//             plugins={[plugin.current]}
//             onMouseEnter={plugin.current.stop}
//             onMouseLeave={plugin.current.reset}
//             className=""
//         >
//             <CarouselContent className="gap-5 flex m-0">
//                 {MOCK_POSTS_DATA.map((product, index) => (
//                     <div key={`${product}-${index}`} className="rounded p-1">
//                             <ProductCard 
//                                 id={product.id}
//                                 title={product.title}
//                                 images={product.images}
//                                 price={product.price}
//                                 description={product.description}
//                                 hasOfferBadge={product.hasOfferBadge} 
//                                 promoPrice={product.promoPrice}
//                                 onAddToCart={() => {
//                                     addToCart(product as any)
//                                 }}
//                                 addToFavorites={() => {
//                                     addToFavorites(product as any);
//                                 }}
//                                 ratingScore={product.rating}
//                                 onGoToPageDetails={() => {
//                                     router.push(`${APP_ROUTES.PRODUCT}/${product.id}`);
//                                 }}
//                                 isItemInCart={isItemInCart && isItemInCart(product.title)}
//                                 isItemInFavorites={isItemInFavorites && isItemInFavorites(product.title)}
//                             />
//                     </div>
//                 ))}
//             </CarouselContent>
//         </Carousel>
//     )
// }

// export default ProductsCardSlider;