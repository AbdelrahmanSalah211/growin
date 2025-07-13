import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="footer bg-surface text-base-content ">
        <div className="px-[2.5rem] pt-[3rem] pb-[2rem]">
          <h1 className="text-primary-text font-extrabold text-[2.25rem]">
            Explore Top Courses
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[7.5rem] w-full px-[6rem] py-[2.5rem]">
            <nav className="flex flex-col gap-2 ">
              <h6 className="font-bold text-[1.25rem] text-primary-text">
                Web Development
              </h6>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Full Stack Web Developer
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                JavaScript
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                React JS
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Angular
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Java
              </Link>
            </nav>
            <nav className="flex flex-col gap-2">
              <h6 className="font-bold text-[1.25rem] text-primary-text">
                IT Certifications
              </h6>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Amazon AWS
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                AWS Certified Cloud Practitioner
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                AZ-900: Microsoft Azure Fundamentals
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                AWS Certified Solutions Architect - Associate
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Kubernetes
              </Link>
            </nav>
            <nav className="flex flex-col gap-2">
              <h6 className="font-bold text-[1.25rem] text-primary-text">
                Data Science
              </h6>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Data Science
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Python
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Machine Learning
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                ChatGPT{" "}
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Deep Learning
              </Link>
            </nav>
            <nav className="flex flex-col gap-2">
              <h6 className="font-bold text-[1.25rem] text-primary-text">
                Communication
              </h6>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Communication Skills
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Presentation Skills
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Public Speaking
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                Writing
              </Link>
              <Link
                href=""
                className="link link-hover text-[1.125rem] text-primary-text"
              >
                PowerPoint
              </Link>
            </nav>
          </div>
          <hr className="text-border w-full" />
          <div className="font-extrabold text-[1.5rem] flex justify-center w-full flex-col items-center text-primary-text pt-[2rem]">
            Growin
            <span className="text-secondary-text font-normal text-[1rem]">
              © 2025 Growin, Inc.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
