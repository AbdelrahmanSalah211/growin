"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCourses, updateCourse } from "@/services/courseService";
import { getAllCategories } from "@/services/courseCategoryService";
import { ICategory } from "@/interfaces/ICategory";
import CourseFormFields from "@/components/course/courseFormFields";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/buttons/Button";

// type CourseProps = {
//     course: {
//         title: string;
//         description: string;
//         price: string;
//         courseCover: string;
//         language?: string;
//         level?: string;
//         courseCategory?: ICategory;
//         file?: File;
//     };
// };

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const courseId = params?.id ? parseInt(params.id as string) : null;
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [course, setCourse] = useState({
        title: "",
        description: "",
        price: "",
        courseCover: "",
        language: "",
        level: "",
        courseCategory: undefined as ICategory | undefined,
        file: undefined as File | undefined,
    });
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const categoriesData = await getAllCategories();
                setCategories(categoriesData);

                if (courseId) {
                    const courseData = await getCourses(courseId);
                    console.log("courseData", courseData);
                    setCourse({
                        title: courseData.title,
                        description: courseData.description,
                        price: courseData.price.toString(),
                        courseCover: courseData.courseCover || "",
                        language: courseData.language || "",
                        level: courseData.level || "",
                        courseCategory: categoriesData.find(
                            (cat: any) =>
                                cat.id === courseData.courseCategory.id
                        ),
                        file: undefined,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                toast.error("Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    const handleChange = (field: string, value: any) => {
        setCourse((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!courseId) return;

        setIsSaving(true);
        try {
            const formData = new FormData();
            formData.append("title", course.title);
            formData.append("description", course.description);
            formData.append("price", course.price);
            formData.append("language", course.language);
            formData.append("level", course.level.toLowerCase());
            if (course.courseCategory) {
                formData.append(
                    "courseCategoryId",
                    String(course.courseCategory.id)
                );
            }
            if (course.file) {
                formData.append("file", course.file);
            }

            const updatedCourse = await updateCourse(courseId, formData);
            toast.success("Course updated successfully!");
            router.refresh();
        } catch (error) {
            console.error("Failed to update course:", error);
            toast.error("Failed to update course");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <CourseFormFields
                course={course}
                categories={categories}
                onChange={handleChange}
                isEditing={!!courseId}
            />

            <div className="flex justify-end">
                <Button
                    children={isSaving ? "Saving..." : "Save"}
                    onClick={handleSave}
                    className="!w-[7.5rem]"
                    buttonProps={{
                        disabled: isSaving,
                        "aria-disabled": isSaving,
                        "aria-label": isSaving
                            ? "Saving course"
                            : "Save course",
                    }}
                ></Button>
            </div>
        </div>
    );
}
