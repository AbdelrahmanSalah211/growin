import { ReactNode } from "react";
import { FormContainer } from "@/components/layout/FormContainer";
import { isLoggedIn, removeAuth } from "@/lib/auth-actions";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  if (await isLoggedIn()) redirect("/");
  return (
    <div className="flex justify-center items-center">
      <div className="">{children}</div>
    </div>
  );
}
