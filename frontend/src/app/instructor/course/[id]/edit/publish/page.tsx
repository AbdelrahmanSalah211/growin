"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { toast } from "react-toastify";
import { publishCourse, getCourses } from "@/services/courseService";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PublishCoursePage() {
    const [isPublishing, setIsPublishing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);
    const params = useParams();
    const router = useRouter();
    const courseId = params?.id as string;

    useEffect(() => {
        const fetchCourseStatus = async () => {
            try {
                const course = await getCourses(parseInt(courseId));
                setIsPublished(course.isPublished);
            } catch (error) {
                console.error("Failed to fetch course details:", error);
                toast.error("Failed to load course status");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseStatus();
    }, [courseId]);

    const handlePublish = async () => {
        if (isPublished) return;

        setIsPublishing(true);
        try {
            const response = await publishCourse(parseInt(courseId));
            toast.success(response.message || "Course published successfully!");
            setIsPublished(true);
            router.refresh();
        } catch (error) {
            console.error("Failed to publish course:", error);
            toast.error("Failed to publish course");
        } finally {
            setIsPublishing(false);
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Course Status</h1>
                    {isPublished && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <svg
                                className="-ml-1 mr-1.5 h-2.5 w-2.5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                            >
                                <circle cx="4" cy="4" r="3" />
                            </svg>
                            Published
                        </span>
                    )}
                </div>

                <div className="space-y-4 p-6 border border-gray-200 rounded-lg">
                    <p className="text-gray-700">
                        {isPublished
                            ? "This course is currently published and visible to learners."
                            : "Publishing this course will make it publicly visible to all learners."}
                        <br />
                        {!isPublished &&
                            "Please review the content to ensure it's complete and ready to share."}
                    </p>

                    <div className="pt-4">
                        {isPublished ? (
                            <div className="space-y-4">
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg
                                                className="h-5 w-5 text-blue-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-blue-700">
                                                Your course is live and
                                                available to learners. You can
                                                still make changes, but they
                                                will be immediately visible to
                                                students.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <Link
                                        href={`/courses/${courseId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-400 transition-all duration-300"
                                    >
                                        <svg
                                            className="-ml-1 mr-2 h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        View Live Course
                                    </Link>

                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/instructor/courses/${courseId}/edit`
                                            )
                                        }
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <svg
                                            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Edit Course Content
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                buttonProps={{
                                    disabled: isPublishing,
                                    "aria-disabled": isPublishing,
                                    "aria-label": isPublishing
                                        ? "Publishing course"
                                        : "Publish course",
                                }}
                                className="!w-[7.5rem]"
                            >
                                {isPublishing ? "Publishing..." : "Publish"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                    <div
                        ref={modalRef}
                        className="bg-white p-6 rounded-lg w-[53.125rem] max-w-full mx-4 shadow-xl"
                    >
                        <p className="mb-4">
                            This action will publish the course and make it
                            visible to all learners.
                            <br />
                            Are you sure you want to continue?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <Button
                                children="Cancel"
                                onClick={() => setIsModalOpen(false)}
                                buttonProps={{
                                    disabled: isPublishing,
                                }}
                                className="!w-[6rem]"
                            />
                            <Button
                                children={
                                    isPublishing ? "Publishing..." : "Confirm"
                                }
                                onClick={handlePublish}
                                buttonProps={{
                                    disabled: isPublishing,
                                }}
                                className="!w-[6rem]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
