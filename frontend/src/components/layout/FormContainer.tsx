import { FC, ReactNode } from "react";

export interface FormContainerProps {
  className?: string;
  children?: ReactNode;
}

export const FormContainer: FC<FormContainerProps> = ({
  className,
  children,
}) => {
  return (
    <section
      className={`z-0 lg:w-[68.75rem] lg:min-h-[45rem] relative flex items-center justify-center bg-surface rounded-[1.875rem] sm:rounded-[3.75rem] overflow-hidden ${className}`}
    >
      <div className="hidden lg:block absolute -left-[6.5625rem] -top-[4.125rem] w-[40.9375rem] h-[40.9375rem] bg-gradient-to-br from-surface to-primary rounded-full z-0"></div>
      <div className="hidden lg:block absolute -left-[4.5rem] top-[29.3125rem] w-[18.75rem] h-[18.75rem] bg-gradient-to-br from-surface to-primary rounded-full z-0"></div>
      <div className="hidden lg:block absolute left-[18.75rem] top-[23.0625rem] w-[15.625rem] h-[15.625rem] bg-gradient-to-br from-surface to-primary rounded-full z-0"></div>
      <div className="hidden lg:block absolute left-[58.6875rem] top-[34.56255rem] w-[15.625rem] h-[15.625rem] bg-gradient-to-br from-surface to-primary rounded-full z-0"></div>

      <div className="z-10 w-full">{children}</div>
    </section>
  );
};
