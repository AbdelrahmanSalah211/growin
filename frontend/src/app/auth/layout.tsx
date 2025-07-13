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
    <div className="h-[40rem] flex justify-center items-center">
      <FormContainer className="sm:scale-[0.8291]">{children}</FormContainer>
    </div>
  );
}
