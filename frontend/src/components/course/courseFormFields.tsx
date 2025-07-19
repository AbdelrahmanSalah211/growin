"use client";

import React, { useEffect, useState } from "react";
import TextInput from "@/components/ui/inputs/TextInput";
import TextArea from "@/components/ui/inputs/TextArea";
import FileInput from "../ui/inputs/FileInput";
import Dropdown from "../ui/inputs/Dropdown";
import { ICategory } from "@/interfaces/ICategory";

// interface Category {
//     id: string;
//     title: string;
// }

type Props = {
    course: {
        title: string;
        description: string;
        price: string;
        courseCover: string;
        language?: string;
        level?: string;
        category?: ICategory;
        file?: File;
    };
    categories: ICategory[];
    onChange: (field: string, value: any) => void;
    isEditing?: boolean;
};

export default function CourseFormFields({
    course,
    categories,
    onChange,
    isEditing = false,
}: Props) {
    const [preview, setPreview] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [selectedLevel, setSelectedLevel] = useState("Beginner");
    const languages = ["English", "Spanish", "French", "German", "Chinese"];
    const levels = ["Beginner", "Intermediate", "Advanced"];

    useEffect(() => {
        if (course.courseCover && typeof course.courseCover === "string") {
            setPreview(course.courseCover);
        }
        console.log("preview", preview);
    }, [course.courseCover]);

    const handleFilesChange = (files: FileList) => {
        const file = files[0];

        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            onChange("file", file);
        } else {
            onChange("file", undefined);
        }
        console.log(course);
    };

    return (
        <div className="space-y-8">
            {/* Basic Info */}
            <section className="space-y-4">
                <h2 className="text-[1.5rem] font-semibold text-primary-text">
                    Basic Information
                </h2>
                <TextInput
                    title="Course Title"
                    placeholder="Enter course title"
                    value={course.title}
                    onChange={(e) => onChange("title", e.target.value)}
                />
                <TextArea
                    title="Description"
                    value={course.description}
                    onChange={(e) => onChange("description", e.target.value)}
                />
            </section>

            <hr className="border-gray-200" />

            {/* Additional Info */}
            <section className="space-y-4">
                <h2 className="text-[1.5rem] font-semibold text-primary-text">
                    Additional Information
                </h2>

                <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-4">
                        <Dropdown
                            title="Language"
                            options={languages}
                            selectedOption={course.language || ""}
                            onSelect={(value) => onChange("language", value)}
                            getLabel={(l) => l}
                            getValue={(l) => l}
                        />
                        <Dropdown
                            title="Level"
                            options={levels}
                            selectedOption={course.level || "Beginner"}
                            onSelect={(value) => onChange("level", value)}
                            getLabel={(l) => l}
                            getValue={(l) => l}
                        />
                    </div>
                    <Dropdown
                        title="Category"
                        options={categories}
                        selectedOption={course.category?.title || ""}
                        onSelect={(id) => onChange("category", Number(id))}
                        getLabel={(cat) => cat.title}
                        getValue={(cat) => String(cat.id)}
                    />
                </div>
            </section>

            <hr className="border-gray-200" />

            {/* Cover Image */}
            <section className="space-y-4">
                <h2 className="text-[1.5rem] font-semibold text-primary-text">
                    Cover Image
                </h2>
                <div className="flex justify-around">
                    <div className="w-[18rem] h-[18rem] rounded-[0.625rem] bg-muted flex items-center justify-center overflow-hidden">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Cover Preview"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <span className="text-muted-foreground text-sm">
                                No image selected
                            </span>
                        )}
                    </div>

                    <FileInput
                        multiple={false}
                        onFilesChange={handleFilesChange}
                        acceptedFileType="image/*"
                    />
                </div>
            </section>

            <hr className="border-gray-200" />

            {/* Pricing */}
            <section className="space-y-4">
                <h2 className="text-[1.5rem] font-semibold text-primary-text">
                    Pricing
                </h2>
                <TextInput
                    title="Price"
                    icon="$"
                    placeholder="Enter course price"
                    value={String(course.price)}
                    onChange={(e) => onChange("price", e.target.value)}
                />
            </section>
        </div>
    );
}
