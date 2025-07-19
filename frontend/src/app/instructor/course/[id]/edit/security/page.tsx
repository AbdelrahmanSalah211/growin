"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/buttons/button";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { deleteCourse } from "@/services/courseService";

export default function DeleteCoursePage() {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const params = useParams();
    const router = useRouter();
    const courseId = params?.id as string;

    const handleDelete = async () => {
        if (!courseId) {
            toast.error("Course ID is missing");
            return;
        }

        setIsDeleting(true);

        try {
            await deleteCourse(parseInt(courseId));
            toast.success("Course deleted successfully!");
            router.push("/instructor/courses");
        } catch (error: any) {
            console.error("Delete course error:", error);
            const errorMessage =
                error.response?.data?.message || "Failed to delete course";
            toast.error(errorMessage);
        } finally {
            setIsDeleting(false);
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

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Delete Course</h1>
                <div className="space-y-4 p-6 border border-gray-200 rounded-lg">
                    <p className="text-gray-700">
                        Deleting this course will remove it from public view and
                        stop any new enrollments.
                        <br />
                        However, students who are already enrolled will still
                        have access to the course content.
                    </p>

                    <div className="pt-4">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            buttonProps={{
                                "aria-label": "Delete course",
                            }}
                            className="!w-[7.5rem] bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete
                        </Button>
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
                            This action will permanently delete the course. It
                            cannot be undone.
                            <br />
                            Are you sure you want to continue?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <Button
                                children="Cancel"
                                onClick={() => setIsModalOpen(false)}
                                className="!w-[6rem]"
                            />
                            <Button
                                children={isDeleting ? "Deleting..." : "Delete"}
                                onClick={handleDelete}
                                buttonProps={{
                                    disabled: isDeleting,
                                }}
                                className="!w-[6rem] bg-red-600 hover:bg-red-700 text-white"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
