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
    <main className="flex justify-center items-center">
      <div>{children}</div>
    </main>
  );
}
