import { getUser } from "@/lib/auth-actions";
import Image from "next/image";
import Link from "next/link";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userDataString = await getUser();
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return (
    <div className="bg-surface text-primary-text container mx-[7.5rem] flex gap-0 rounded-[1.25rem] min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 rounded-l-[1.25rem]  border-r border-r-border">
        <div className="flex flex-col gap-2 p-[1.875rem]">
          <div className="avatar">
            <div className="w-32 rounded-full bg-background border border-border">
              <Image
                src={userData?.profileImage || "/images.jpeg"}
                alt={userData?.username || "User"}
                width={96}
                height={96}
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium max-w-full truncate">
              {userData?.username}
            </h2>
            <p className="text-sm text-secondary-text max-w-full truncate">
              {userData?.email}
            </p>
          </div>
        </div>

        <ul className="flex flex-col w-full gap-1">
          <Link href="/me/settings/profile">
            <li className="flex items-center justify-between px-[1.875rem] py-[0.5625rem] text-base hover:bg-background transition-colors">
              Profile
            </li>
          </Link>
          <Link href="/me/settings/security">
            <li className="flex items-center justify-between px-[1.875rem] py-[0.5625rem] text-base hover:bg-background transition-colors">
              Account Security
            </li>
          </Link>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-full">{children}</main>
    </div>
  );
}
