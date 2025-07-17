"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { isLoggedIn, useAuthStore } from "@/stores/authStore";
import { removeAuth } from "@/lib/auth-actions";
import { logout } from "@/services/authService";

import { Button } from "../ui/buttons/button";
import SearchInput from "../ui/inputs/SearchInput";
import { LinkIcon } from "../icons/LinkIcon";
import { CartIcon } from "../icons/CartIcon";
import Image from "next/image";
import { UserIcon } from "../icons/UserIcon";
import { getAllCategories } from "@/services/courseCategoryService";
import { ICategory } from "@/interfaces/ICategory";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";

export default function Navbar() {
  useHydrateAuth();
  const { user, token, clearAuth } = useAuthStore();
  const isGuest = !isLoggedIn();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const categories = await getAllCategories();
        setCategories(categories);
      };
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    search && params.set("title", search);
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const handleLogout = async () => {
    await logout(token);
    await removeAuth();
    clearAuth();
    router.push("/auth/login");
  };

  return (
    <nav className="relative z-50 text-primary-text flex items-center justify-between bg-surface rounded-[0.625rem] shadow-sm px-[1.875rem] py-[0.625rem] mt-[1.875rem] mx-[7.5rem]">
      {/* left */}
      <div className="flex items-center space-x-[1.875rem]">
        <Link href="/" className="block">
          <p className="text-2xl font-extrabold">Growin</p>
        </Link>

        <div className="dropdown">
          <div role="button" className="">
            <Button className="!w-fit px-5 !py-[0.5625rem] !text-base !font-normal text-primary-text bg-transparent hover:text-primary-text hover:!bg-background">
              Explore
            </Button>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content fixed z-20 w-[18.75rem] bg-surface my-5 py-[1.5625rem] rounded-[0.625rem] shadow-sm"
          >
            <li className="px-[1.75rem] mb-[0.4375rem] text-lg font-semibold">
              Explore by Category
            </li>
            {Object.values(categories).map((category) => (
              <Link key={category.id} href="#" className="block">
                <li className="flex items-center justify-between px-[1.75rem] py-[0.9375rem] text-base hover:bg-background transition-colors">
                  <span>{category.title}</span>
                  <LinkIcon color="#2C3E50" size={20} />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* center */}
      <div>
        <form onSubmit={onSubmit}>
          <SearchInput value={search} onChange={handleSearch} />
        </form>
      </div>

      {/* right */}
      <div className="flex items-center space-x-[1.875rem]">
        <Link href="/me/cart">
          <Button className="flex items-center justify-center !w-[2.5rem] aspect-square !py-[0] text-[1.125rem] !font-normal text-primary-text bg-transparent hover:text-primary-text hover:!bg-background">
            <CartIcon color="#2C3E50" size={28} />
          </Button>
        </Link>
        {isGuest ? (
          <>
            <Link href="/auth/login" className="text-base hover:underline">
              Log in
            </Link>
            <Link href="/auth/signup" className="text-base hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            <Link href="/me/learning" className="text-base hover:underline">
              My Learning
            </Link>
            <div className="dropdown">
              <div role="button" className="">
                <Button className="flex items-center justify-center !rounded-[50%] !w-[2.5rem] aspect-square !py-[0] text-[1.125rem] !font-normal text-primary-text bg-transparent hover:text-primary-text hover:!bg-background">
                  {user?.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.username}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  ) : (
                    <UserIcon color="#2C3E50" size={32} />
                  )}
                </Button>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content fixed z-20 w-[15.9375rem] bg-surface -mx-46 my-4 py-[1.5625rem] rounded-[0.625rem] shadow-sm"
              >
                <Link href="/me/settings" className="block">
                  <li className="flex items-center justify-between space-x-[0.9375rem] px-[1.5625rem] py-[0.5625rem] text-[1.25rem] hover:bg-background transition-colors">
                    {user?.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={user.username}
                        width={70}
                        height={70}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="p-5 aspect-square rounded-full shadow-sm">
                        <UserIcon color="#2C3E50" size={32} />
                      </div>
                    )}
                    <p className="flex flex-col">
                      <span className="font-bold text-base">
                        {user?.username}
                      </span>
                      <span className="text-sm truncate max-w-[8rem] block">
                        {user?.email}
                      </span>
                    </p>
                  </li>
                </Link>
                <Link href="/me/learning" className="block">
                  <li className="flex items-center justify-between px-[1.875rem] py-[0.5625rem] text-base hover:bg-background transition-colors">
                    My Learning
                  </li>
                </Link>
                <Link href="/me/cart" className="block">
                  <li className="flex items-center justify-between px-[1.875rem] py-[0.5625rem] text-base hover:bg-background transition-colors">
                    My Cart
                  </li>
                </Link>

                <hr className="my-[0.9375rem] text-border" />

                <Link href="/me/settings/profile" className="block">
                  <li className="flex items-center justify-between px-[1.875rem] py-[0.5625rem] text-base hover:bg-background transition-colors">
                    Account Settings
                  </li>
                </Link>
                <Link href="#" className="block" onClick={handleLogout}>
                  <li className="flex items-center justify-between px-[1.875rem] py-[0.5625rem] text-base hover:bg-background transition-colors">
                    Log out
                  </li>
                </Link>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
