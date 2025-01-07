"use client";

import React from 'react';
import BlogPost from './blog-post';


const BlogPostsGrid = ({ posts }: any) => {
    const isSinglePost = posts.length === 1;

    return (
        <div className={isSinglePost ? 'flex justify-center items-center' : "grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4"}>
            {posts.map((post: any, index: number) => (
                <BlogPost key={index} post={post} />
            ))}
        </div>
    );
};

export default BlogPostsGrid;