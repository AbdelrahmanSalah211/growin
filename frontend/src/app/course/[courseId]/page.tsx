import CourseContent from "@/app/components/CourseContent";
import CourseInfo from "@/app/components/CourseInfo";
import CourseHeader from "@/app/components/CourseLessonHeader";
// import Image from "next/image";

export default function CoursesPage() {
  return (
    <div className="min-h-screen w-full bg-background px-4 py-8 md:px-8 flex justify-center">
      <article className="w-full max-w-[75rem] bg-surface rounded-[3.75rem] shadow-lg overflow-hidden">
        {/* <Image
          alt="course"
          src="/coursecover.jpg"
          width={1200}
          height={450}
          className="w-full h-[200px] sm:h-[300px] md:h-[450px] object-cover rounded-t-[3.75rem]"
        /> */}

        <CourseHeader alt="course" src="/coursecover.jpg" image={true} />

        <div className="p-6 md:p-10 flex flex-col gap-10">
          {/* Title & Description */}
          <section className="flex flex-col gap-5">
            {/* <h1 className="text-primary-text text-[2rem] sm:text-[2.5rem] font-bold leading-tight max-w-4xl">
              The Complete AI Guide: Learn ChatGPT, Generative AI & More
            </h1>
            <h2 className="text-primary-text text-lg sm:text-xl leading-snug">
              50+ Generative AI Tools to 10x Business, Productivity, Creativity
              | ChatGPT, Artificial Intelligence, Prompt Engineering
            </h2> */}
            <CourseInfo
              subTitle=" 50+ Generative AI Tools to 10x Business, Productivity, Creativity
              | ChatGPT, Artificial Intelligence, Prompt Engineering"
              title="              The Complete AI Guide: Learn ChatGPT, Generative AI & More
"
            />

            {/* Badge, Rating, Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base max-w-4xl">
              <span className="bg-background text-primary-text rounded-[0.3125rem] py-1 px-3 font-medium">
                Intermediate
              </span>

              <div className="flex items-center gap-2">
                <span>4</span>
                <div className="rating flex gap-[0.125rem]">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <input
                      key={n}
                      type="radio"
                      name="rating"
                      className="mask mask-star bg-primary-text"
                      aria-label={`${n} star`}
                      defaultChecked={n === 2}
                    />
                  ))}
                </div>
              </div>

              <p className="text-secondary-text">49.723</p>
              <p className="text-primary-text">
                285,016 <span className="text-secondary-text">students</span>
              </p>
            </div>

            {/* Author & Date */}
            <div className="flex flex-col gap-2 text-base sm:text-lg">
              <p className="text-primary-text font-bold">
                Created by:{" "}
                <span className="font-normal">
                  Julian Melanson, Benza Maman, Leap Year Learning
                </span>
              </p>
              <p className="text-primary-text font-bold">
                Last updated: <span className="font-normal">7/2025</span>
              </p>
            </div>
          </section>

          <hr className="border-t border-border" />

          {/* Price & Buttons */}
          <section className="flex flex-col gap-6">
            <div>
              <h1 className="text-primary-text font-bold text-[2.25rem]">
                E£1,179.99
              </h1>
              <p className="text-primary-text text-base">
                Full Lifetime Access
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full">
              <button className="text-center w-full sm:w-auto px-[8.375rem] py-[1.06255rem] rounded-[0.625rem] bg-primary-text text-background text-base font-semibold hover:opacity-90 transition">
                Enroll Now
              </button>
              <button className="text-center w-full sm:w-auto px-[1.6875rem]  py-[1.06255rem] rounded-[0.625rem] bg-background text-primary-text text-base font-semibold hover:opacity-90 transition">
                Share
              </button>
            </div>
          </section>

          <hr className="border-t border-border" />

          {/* Course Content */}
          {/* <section className="flex flex-col gap-6">
            <div>
              <h1 className="text-primary-text font-bold text-[2.25rem]">
                Course Content
              </h1>
              <p className="text-base text-secondary-text">489 Lectures</p>
            </div>

            <div className="cursor-pointer flex justify-between items-center bg-background rounded-[1.25rem] w-full p-6">
              <div className="flex gap-[0.625rem] items-center ">
                <h2 className="text-primary-text font-semibold">
                  [Course Sections Placeholder]
                </h2>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[2rem] cursor-pointer"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5"
                      stroke="#2C3E50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>

              <p>4min</p>
            </div>

            <div className="rounded-[1.25rem] bg-background p-6 w-full">
              {" "}
              <h2 className="text-center text-primary-text font-semibold">
                470 more lectures
              </h2>
            </div>
          </section> */}

          <CourseContent
            lectruesNumber={450}
            lessonDuration={2}
            lessonLength={450}
            titleLesson="sdad"
          />
          <hr className="border-t border-border" />
          {/* reviews section */}
          <section>
            <div className="pb-10">
              <h1 className="text-primary-text font-bold text-[2.25rem]">
                4.5 Course rating - 50k rewiews
              </h1>
            </div>

            <div className="flex flex-col gap-[0.875rem]">
              <div className="flex items-center gap-[0.875rem]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[2rem] h-[2rem]"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z"
                      stroke="#2C3E50"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22"
                      stroke="#2C3E50"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <div className="flex flex-col">
                  <h3 className="text-primary-text font-bold">LuigiS.</h3>
                  <div className="flex items-center gap-2">
                    <span>4</span>
                    <div className="rating flex gap-[0.125rem]">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <input
                          key={n}
                          type="radio"
                          name="rating"
                          className="mask w-[1.0625rem] mask-star bg-secondary-text"
                          aria-label={`${n} star`}
                          defaultChecked={n === 2}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-primary-text font-normal ">
                The course had plenty of helpful, and up-to-date, content. The
                initial chapters about effecting prompting and technology behind
                ChatGPT are quite insightful. However, the editing with cuts
                every 3-5 seconds is often distracting and even cause motion
                sickness.
              </h3>
              <hr className="border-t border-border" />
            </div>

            <div className="rounded-[1.25rem] bg-background p-6 w-full">
              {" "}
              <h2 className="text-center text-primary-text font-semibold">
                470 more lectures
              </h2>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
