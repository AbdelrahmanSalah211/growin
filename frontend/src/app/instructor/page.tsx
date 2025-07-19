"use client";
import { useState, useEffect } from "react";
import InstructorCourseCard from "@/components/course/instructorCourseCard";
import { Button } from "@/components/ui/buttons/Button";
import { useRouter } from "next/navigation";
import { getInstructorCourses } from "@/services/courseService";
import { toast } from "react-toastify";
import { ICourse } from "@/interfaces/ICourse";

export default function InstructorCoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await getInstructorCourses();
                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                setError("Failed to load courses");
                toast.error("Failed to load courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCreateCourse = () => {
        router.push("/instructor/course/create");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="space-y-5 flex flex-col justify-center bg-surface w-[81rem] mx-[7.5rem] p-8 rounded-2xl mb-4">
            <div className="flex justify-between">
                <p className="text-[2.5rem] text-primary-text font-extrabold">
                    My Courses
                </p>
                <Button
                    className="!w-[10.9375rem]"
                    onClick={handleCreateCourse}
                >
                    Create course
                </Button>
            </div>

            <div className="flex flex-col space-y-3">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <InstructorCourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p className="text-gray-500">
                        You haven't created any courses yet
                    </p>
                )}
            </div>
        </div>
    );
}
