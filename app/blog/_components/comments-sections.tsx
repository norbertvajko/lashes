"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Loading from '../loading';
import { useSession } from '@clerk/nextjs';
import { FaSpinner } from 'react-icons/fa'; // Importă un icon de loading

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    blogPostTitle: string;
    user: {
        name: string;
        image: string;
        email: string;
    };
}

const CommandsSection = () => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [totalComments, setTotalComments] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); // State to track loading status
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Track if submitting a comment
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();
    const blogPostTitle = pathname.slice(pathname.indexOf('/blog/') + 6);
    const session = useSession();

    const fetchComments = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/user/get-comments?blogPostTitle=${encodeURIComponent(blogPostTitle)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data: Comment[] = await response.json();
            setComments(data);
    
            const filteredComments = data.filter((comment: Comment) => comment.blogPostTitle === blogPostTitle);
            setTotalComments(filteredComments.length);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    }, [blogPostTitle]); 
    
    useEffect(() => {
        fetchComments();
    }, [blogPostTitle, fetchComments]); 

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsSubmitting(true); 
        try {
            const response = await fetch('/api/user/post-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment, userId: session.session?.user?.id, blogPostTitle }),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            fetchComments();
            setComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            setIsSubmitting(false); // Set submitting to false after the request is completed
        }
    };

    const getUserNameFromEmailAddress = (email: string) => {
        if (!email || typeof email !== 'string') {
            return null; 
        }
        return email.split('@')[0];
    };

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                        Discutii ({totalComments})
                    </h2>
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <div>
                        {comments
                            .filter((comment: Comment) => comment.blogPostTitle === blogPostTitle)
                            .map((comment: Comment) => (
                                <article key={comment.id} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                <img
                                                    className="mr-2 w-6 h-6 rounded-full"
                                                    src={comment.user.image ?? "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"}
                                                    alt="Profile"
                                                />
                                                {!comment.user.name || comment.user.name === "null null" ? getUserNameFromEmailAddress(comment.user.email) : comment.user.name}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                                <time
                                                    dateTime={comment.createdAt}
                                                    title={comment.createdAt}
                                                >
                                                    {new Date(comment.createdAt).toLocaleDateString('ro-RO', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                    })}
                                                </time>
                                            </p>
                                        </div>
                                    </footer>
                                    <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
                                </article>
                            ))}
                    </div>
                )}
                <form className="mb-6" onSubmit={handleSubmit}>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">
                            Comentariul tau
                        </label>
                        <textarea
                            style={!session.session?.user ? { cursor: "not-allowed" } : { cursor: "text" }}
                            id="comment"
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Lasa un comentariu..."
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={!session.session?.user || isSubmitting} // Disable textarea when submitting
                        ></textarea>
                    </div>
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Button
                            variant={'primary'}
                            disabled={!session?.session?.user || isSubmitting} // Disable button during submission
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 focus:outline-none"
                        >
                            {isSubmitting ? (
                                <FaSpinner className="animate-spin mr-2" /> // Show spinning icon when submitting
                            ) : (
                                'Posteaza comentariu'
                            )}
                        </Button>
                    </div>
                    {!session?.session?.user && isHovered && (
                        <div className="b-3 sm:pb-0 block sm:absolute bg-black opacity-90 text-white rounded-sm shadow-md mt-2">
                            <p className="px-4 py-2">
                                Trebuie sa fii autentificat pentru a putea adauga comentarii!
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default CommandsSection;
