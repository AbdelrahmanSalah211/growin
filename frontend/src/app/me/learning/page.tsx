"use client";
import { useState, useEffect } from "react";
import { FormContainer } from "@/components/layout/FormContainer";
import { getUserEnrollments } from "@/services/userEntrollmentsService";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { useAuthStore } from "@/stores/authStore";
import { CourseCard } from "@/components/course/courseCard";

export default function Home() {
    useHydrateAuth();
    const accessToken = useAuthStore((state) => state.token) || "";

    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!accessToken) return;
            try {
                const courses = await getUserEnrollments(accessToken);
                console.log(courses);
                setEnrolledCourses(courses);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [accessToken]);

    return (
        <div className="space-y-[2rem] px-[7rem] py-[2rem]">
            <h1 className="text-[2.5rem] text-primary-text font-extrabold">
                My Courses
            </h1>

            {loading ? (
                <div className="flex justify-center items-center min-h-[30rem]">
                    <span className="loading loading-ring loading-6xl text-primary-text"></span>
                </div>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrolledCourses.map((course: any) => (
                        <CourseCard
                            key={course.course.courseId}
                            id={course.course.courseId}
                            title={course.course.title}
                            description={course.course.description}
                            courseCover={course.course.courseCover}
                            level={course.course.level}
                            price={course.course.price}
                            rating={course.course.rating}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
