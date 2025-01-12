"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const BlogPost = ({ post }: any) => {
    const router = useRouter();

    const handleNavigation = (title: string) => {
        const formattedTitle = title.replace(/\s+/g, '_');
        router.push(`/blog/post_${formattedTitle}`);
    };

    return (
        <article className="flex flex-col dark:bg-gray-50 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <a
                rel="noopener noreferrer"
                href="#"
                aria-label={post.title}
                onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(post.title);
                }}
                className="block w-full" 
            >
                <img
                    alt={post.title}
                    className="object-cover w-full h-52 dark:bg-gray-500 rounded-t-lg" 
                    src={post.imgSrc}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(post.title);
                    }} />
            </a>
            <div className="flex flex-col flex-1 p-6">
                <a
                    rel="noopener noreferrer"
                    href="#"
                    aria-label={post.title}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(post.title);
                    }}
                    className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600"
                >
                    {post.header}
                </a>
                <h3
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(post.title);
                    }}
                    className="flex-1 py-2 text-lg font-semibold leading-snug cursor-pointer"
                >
                    {post.title}
                </h3>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                    <span>{post.date}</span>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
