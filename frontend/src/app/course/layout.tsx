import { ReactNode } from "react";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main className="mx-[7.5rem] bg-surface rounded-[1.25rem] overflow-hidden">{children}</main>;
}
