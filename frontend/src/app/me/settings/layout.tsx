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
    <div className="bg-surface container mx-auto px-4 py-8 flex gap-0 rounded-[1.25rem]">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 rounded-l-[1.25rem] p-6 h-fit">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full bg-base-300">
              <Image
                src={userData?.profileImage || "/images.jpeg"}
                alt={userData?.username || "User"}
                width={96}
                height={96}
              />
            </div>
          </div>
          <h2 className="mt-4 text-lg font-medium">{userData?.username}</h2>
          <p className="text-sm text-base-content/70">{userData?.email}</p>
        </div>

        <ul className="menu w-full gap-1">
          <li>
            <Link href="/me/settings/profile" className="text-base">Profile</Link>
          </li>
          <li>
            <Link href="/me/settings/security" className="text-base">Account Security</Link>
          </li>
          <li>
            <Link href="/me/settings/payment" className="text-base">Payment Methods</Link>
          </li>
          <li>
            <Link href="/me/settings/close" className="text-base">Close Account</Link>
          </li>
        </ul>
      </aside>

      {/* Separator */}
      <div className="w-px bg-base-300 mx-0 my-6" />

      {/* Main Content */}
      <main className="flex-1 bg-base-200 rounded-r-[1.25rem] p-6">{children}</main>
    </div>
  );
}
