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
    <div className="p-[3rem] flex justify-center items-center">
      <FormContainer className="">{children}</FormContainer>
    </div>
  );
}
