"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

export default function EditLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const pathname = usePathname();
    const { id: courseId } = use(params);
    const tabs = [
        { id: "information", label: "Information" },
        { id: "lectures", label: "Lectures" },
        { id: "publish", label: "Publish" },
        { id: "security", label: "Security" },
    ];

    const activeTab = pathname?.split("/").pop();

    return (
        <div className="space-y-5 flex flex-col justify-center bg-surface w-[91rem] mx-auto p-8 rounded-2xl mb-4">
            <p className="text-[2rem] text-primary-text font-extrabold">
                Edit Course
            </p>

            <nav className="border-b border-gray-200">
                <div className="flex space-x-8">
                    {tabs.map((tab) => {
                        const isActive = tab.id === activeTab;
                        return (
                            <Link
                                key={tab.id}
                                href={`/instructor/course/${courseId}/edit/${tab.id}`}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    isActive
                                        ? "border-primary text-primary font-semibold"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                } transition-colors duration-200`}
                            >
                                {tab.label}
                                {isActive && (
                                    <span className="sr-only">(current)</span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <main className="py-2">{children}</main>
        </div>
    );
}
