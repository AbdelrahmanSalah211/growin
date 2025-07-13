interface CourseInfoProps {
  title?: string;
  description?: string;
}

export default function CourseInfo({ description, title }: CourseInfoProps) {
  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-primary-text text-[2rem] sm:text-[2.5rem] font-bold leading-tight max-w-4xl">
        {title}
      </h1>
      <h2 className="text-primary-text text-lg sm:text-xl leading-snug">
        {description}
      </h2>
      {/* <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base max-w-4xl">
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
        </div> */}
    </section>
  );
}
