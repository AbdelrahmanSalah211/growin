
import { getUser } from "@/lib/auth-actions";
import Link from "next/link";
import React from "react";

interface UserDetails {
  id: number;
  email: string;
  username: string;
  profileImage: string;
  userMode: string;
}
export default async function AccountSettingsNav() {
  const userStr = await getUser();

  if (userStr === null) {
    return;
  }
  const user = JSON.parse(userStr);

  return (
    <>
      <div className="w-[13.125rem] ">
        <div className="avatar">
          <div className=" rounded-full w-[9.375rem] h-[9.375rem]">
            <img src={user.src} />
          </div>
        </div>
        <div className="text-primary-text pb-[2.8125rem] ">
          <p className="font-bold text-[1.25rem]">
            {user.username}
          </p>
          <p className="text-base">{user.email}</p>
        </div>
        <div className="flex flex-col gap-5 text-primary-text">
            <Link href="/me/profile" className="text-xl">Profile</Link>
            <Link href="/me/account" className="text-xl">Account Security</Link>
            <Link href="" className="text-xl">Payment Methods</Link>
            <Link href="" className="text-xl">Close Account</Link>
        </div>
      </div>
    </>
  );
}
