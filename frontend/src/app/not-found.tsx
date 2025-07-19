"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-primary-text min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center space-y-4">
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-primary-content">
            Page Not Found
          </h2>
          <p className="text-base text-base-content">
            Sorry, the page you’re looking for doesn’t exist or may have been
            moved.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/" className="">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
