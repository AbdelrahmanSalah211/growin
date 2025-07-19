"use client";
import React, { useState } from "react";
import { Users, Globe, BookOpen } from "lucide-react";
import { Edit } from "lucide-react";
import Link from "next/link";
import { ICourse } from "@/interfaces/ICourse";

interface InstructorCourseCardProps {
    course: ICourse;
}

const InstructorCourseCard = ({ course }: InstructorCourseCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="w-[full] bg-surface rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-stretch gap-4 p-4">
                {/* Course Image */}
                <div className="relative flex-shrink-0">
                    <img
                        src={course?.courseCover}
                        alt="Course thumbnail"
                        className={`w-40 h-full object-cover rounded-lg transition-opacity duration-300 ${
                            isHovered ? "opacity-70" : "opacity-100"
                        }`}
                    />
                </div>

                {/* Course Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-primary-text line-clamp-2">
                            {course?.title || "Title"}
                        </h3>
                        <span className="text-sm text-secondary-text font-medium bg-secondary px-2 py-1 rounded">
                            {course?.isPublished ? "Published" : "Private"}
                        </span>
                    </div>

                    <p className="text-secondary-text text-sm mb-3 line-clamp-2">
                        {course?.description || "Description"}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-secondary-text">
                        <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{course?.level || "Beginner"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            <span>{course?.language || "English"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 rounded-lg ${
                    isHovered ? "bg-surface bg-opacity-80" : "opacity-0"
                }`}
            >
                <Link
                    href={`/instructor/course/${course?.id}/edit/information`}
                    className="text-primary text-xl font-semibold hover:text-primary-dark transition-colors duration-200 flex items-center"
                >
                    <Edit className="w-6 h-6 mr-2" />
                    Edit / Manage Course
                </Link>
            </div>
        </div>
    );
};

export default InstructorCourseCard;
