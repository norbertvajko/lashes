import React, { Suspense } from 'react';
import BlogHeader from './_components/blog-header';
import BlogPostsGrid from './_components/blog-posts.grid';
import Loading from './loading';
import { MOCK_POSTS_DATA } from '@/data/products-mock-data';


export const metadata = {
    title: "Blog",
    description: "Blog description"
};

const Blog = async () => {
    return (
        <Suspense fallback={<Loading />}>
            <section className="py-6 sm:py-12 bg-white text-black">
                <div className="container p-6 mx-auto space-y-8 my-[22.5px]">
                    <BlogHeader />
                    <BlogPostsGrid posts={MOCK_POSTS_DATA} />
                </div>
            </section>
        </Suspense>
    );
};

export default Blog;