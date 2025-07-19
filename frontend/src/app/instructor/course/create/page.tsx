"use client";

import React, { useState, useEffect } from "react";
import CourseFormFields from "@/components/course/courseFormFields";
import { ICategory } from "@/interfaces/ICategory";
import { getAllCategories } from "@/services/courseCategoryService";
import { createCourse } from "@/services/courseService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CreateCourseDto } from "@/services/courseService";

export default function CreateCoursePage() {
    const router = useRouter();
    const [course, setCourse] = useState({
        title: "",
        description: "",
        price: "",
        courseCover: "string",
        file: undefined as File | undefined,
        language: "English",
        level: "Beginner",
        category: "",
    });

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getAllCategories();
                setCategories(categories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                toast.error("Failed to load categories");
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (field: string, value: any) => {
        setCourse((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!course.file) {
            toast.error("Please select a cover image");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload: CreateCourseDto = {
                title: course.title,
                description: course.description,
                language: course.language,
                level: course.level.toLowerCase() as
                    | "beginner"
                    | "intermediate"
                    | "advanced",
                price: course.price,
                courseCategoryId: course.category,
                file: course.file,
            };

            const createdCourse = await createCourse(payload);
            toast.success("Course created successfully!");
            router.push(`/courses/${createdCourse.id}`);
        } catch (error) {
            console.error("Course creation failed:", error);
            toast.error(
                typeof error === "string"
                    ? error
                    : error instanceof Error
                    ? error.message
                    : "Course creation failed"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="space-y-5 flex flex-col justify-center bg-surface w-[81rem] mx-[7.5rem] p-8 rounded-2xl mb-4">
            <h1 className="text-2xl font-bold text-primary-text">
                Create New Course
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <CourseFormFields
                    course={course}
                    categories={categories}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-primary text-white px-6 py-3 rounded-md ${
                        isSubmitting
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-primary-dark"
                    }`}
                >
                    {isSubmitting ? "Creating..." : "Create Course"}
                </button>
            </form>
        </main>
    );
}
