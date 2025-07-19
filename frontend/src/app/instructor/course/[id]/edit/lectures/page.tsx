"use client";

import React, { useEffect, useState } from "react";
import TextInput from "@/components/ui/inputs/TextInput";
import SearchInput from "@/components/ui/inputs/SearchInput";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/buttons/button";
import { toast } from "react-toastify";
import {
    createLesson,
    getCourseLessons,
    updateLesson,
} from "@/services/lessonsServices";

interface Lecture {
    id: number;
    title: string;
    videoFile: File | null;
    position: number;
    fileURL?: string;
    originalTitle: string;
    originalFileURL?: string;
    hasChanges: boolean;
}

export default function LecturePage() {
    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSaving, setIsSaving] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const courseId = Number(params?.id);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                setIsLoading(true);
                const lessons = await getCourseLessons(courseId);
                const formattedLectures = lessons.map((lesson) => ({
                    id: lesson.id,
                    title: lesson.title,
                    originalTitle: lesson.title,
                    videoFile: null,
                    position: lesson.position,
                    fileURL: lesson.fileURL,
                    originalFileURL: lesson.fileURL,
                    hasChanges: false,
                }));
                setLectures(formattedLectures);
            } catch (error) {
                console.error("Failed to fetch lessons:", error);
                toast.error("Failed to load lessons");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLessons();
    }, [courseId]);

    const handleTitleChange = (lectureId: number, newTitle: string) => {
        setLectures((prev) =>
            prev.map((lecture) => {
                if (lecture.id === lectureId) {
                    const hasChanges =
                        newTitle !== lecture.originalTitle ||
                        lecture.videoFile !== null;
                    return {
                        ...lecture,
                        title: newTitle,
                        hasChanges,
                    };
                }
                return lecture;
            })
        );
    };

    const handleVideoUpload = (lectureId: number, file: File) => {
        setLectures((prev) =>
            prev.map((lecture) => {
                if (lecture.id === lectureId) {
                    const hasChanges =
                        file !== null ||
                        lecture.title !== lecture.originalTitle;
                    return {
                        ...lecture,
                        videoFile: file,
                        hasChanges,
                    };
                }
                return lecture;
            })
        );
    };

    const handleSaveLecture = async (lectureId: number) => {
        const lecture = lectures.find((l) => l.id === lectureId);
        if (!lecture) return;

        setIsSaving(lectureId);

        try {
            const formData = new FormData();
            formData.append("title", lecture.title);
            formData.append("position", lecture.position.toString());

            if (lecture.videoFile) {
                formData.append("file", lecture.videoFile);
            }

            let response;
            if (lecture.fileURL) {
                response = await updateLesson(lecture.id, formData);
            } else {
                formData.append("courseId", courseId.toString());
                response = await createLesson(formData);
            }

            setLectures((prev) =>
                prev.map((l) => {
                    if (l.id === lectureId) {
                        return {
                            ...l,
                            fileURL: response.fileURL || l.fileURL,
                            originalTitle: l.title,
                            originalFileURL: response.fileURL || l.fileURL,
                            hasChanges: false,
                            videoFile: null,
                        };
                    }
                    return l;
                })
            );

            toast.success(
                `Lecture ${
                    lecture.fileURL ? "updated" : "created"
                } successfully!`
            );
        } catch (error) {
            console.error("Failed to save lecture:", error);
            toast.error(
                `Failed to ${lecture.fileURL ? "update" : "create"} lecture`
            );
        } finally {
            setIsSaving(null);
        }
    };

    const addNewLecture = () => {
        const newId =
            lectures.length > 0
                ? Math.max(...lectures.map((l) => l.id)) + 1
                : 1;
        const newPosition =
            lectures.length > 0
                ? Math.max(...lectures.map((l) => l.position)) + 1
                : 1;

        setLectures((prev) => [
            ...prev,
            {
                id: newId,
                title: "",
                videoFile: null,
                position: newPosition,
                originalTitle: "",
                originalFileURL: undefined,
                hasChanges: true,
                fileURL: undefined,
            },
        ]);
    };

    const filteredLectures = lectures.filter((lecture) =>
        lecture.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (lectures.length === 0) {
        return (
            <div className="space-y-8">
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-[1.5rem] font-semibold text-primary-text">
                            0 Lectures
                        </h1>
                    </div>
                </section>

                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No lectures yet
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Get started by adding your first lecture to this
                            course.
                        </p>
                        <button
                            onClick={addNewLecture}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                        >
                            Add Lecture
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-[1.5rem] font-semibold text-primary-text">
                        {lectures.length} Lectures
                    </h1>
                </div>

                <SearchInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </section>

            <div className="space-y-6">
                {filteredLectures.map((lecture) => (
                    <section
                        key={lecture.id}
                        className="space-y-4 p-6 border border-gray-200 rounded-lg"
                    >
                        <h2 className="text-[1.2rem] font-semibold text-primary-text">
                            Lecture #{lecture.position}
                        </h2>

                        <TextInput
                            title="Lecture Title"
                            placeholder="Title"
                            value={lecture.title}
                            onChange={(e) =>
                                handleTitleChange(lecture.id, e.target.value)
                            }
                        />

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Lecture video
                            </label>
                            <div className="flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-500">
                                        {lecture.videoFile
                                            ? lecture.videoFile.name
                                            : lecture.fileURL
                                            ? "Video uploaded"
                                            : "No file selected"}
                                    </span>
                                </div>
                                <label className="cursor-pointer bg-background text-primary-text px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    {lecture.fileURL
                                        ? "Change Video"
                                        : "Upload"}
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            e.target.files &&
                                            handleVideoUpload(
                                                lecture.id,
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                </label>
                            </div>
                            {lecture.fileURL && !lecture.videoFile && (
                                <div className="text-sm text-green-600 mt-1">
                                    Video successfully uploaded
                                </div>
                            )}
                            {lecture.videoFile && (
                                <div className="text-sm text-blue-600 mt-1">
                                    New video selected (click Save to update)
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => handleSaveLecture(lecture.id)}
                                disabled={
                                    isSaving === lecture.id ||
                                    !lecture.hasChanges
                                }
                                className={`bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isSaving === lecture.id ||
                                    !lecture.hasChanges
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-gray-900 cursor-pointer"
                                }`}
                            >
                                {isSaving === lecture.id ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </section>
                ))}
            </div>

            <div className="flex flex-1">
                <Button onClick={addNewLecture} className="!w-[9.875rem]">
                    Add Lecture
                </Button>
            </div>
        </div>
    );
}
