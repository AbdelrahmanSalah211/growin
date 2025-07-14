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

// const categories = [
//   "Development",
//   "Business",
//   "Finance",
//   "Accounting",
//   "IT & Software",
// ];

export default function Navbar() {
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
        if (!token) return;
        const categories = await getAllCategories(token || "");
        setCategories(categories);
      };
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (search) {
      const params = new URLSearchParams({ q: search });
      router.push(`/search?${params.toString()}`);
    }
  };

  const handleLogout = async () => {
    await logout(token);
    await removeAuth();
    clearAuth();
    router.push("/auth/login");
  };

  return (
    <header className="relative z-50 pt-[1rem] px-[7.5rem] text-primary-text">
      <nav className="flex items-center justify-between bg-surface rounded-[3.75rem] shadow-sm px-[1.875rem] py-[0.625rem]">
        {/* left */}
        <div className="flex items-center space-x-[1.875rem]">
          <Link href="/" className="block">
            <p className="text-[1.5rem] font-extrabold">Growin</p>
          </Link>

          <div className="dropdown">
            <div role="button" className="m-1">
              <Button className="!w-[7.1875rem] !py-[0.8125rem] text-[1.125rem] !font-normal text-primary-text bg-transparent hover:text-primary-text hover:!bg-background">
                Explore
              </Button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content fixed z-20 w-[20.9375rem] bg-surface mx-1 my-4 py-[1.875rem] rounded-[1.875rem] shadow-sm"
            >
              <li className="px-[1.875rem] mb-[0.4375rem] text-[1.25rem] font-semibold">
                Explore by Category
              </li>
              {Object.values(categories).map((category) => (
                <Link key={category.id} href="#" className="block">
                  <li className="flex items-center justify-between px-[1.875rem] py-[0.8125rem] text-[1.25rem] hover:bg-background transition-colors">
                    <span>{category.title}</span>
                    <LinkIcon color="#2C3E50" />
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
          <Link href="/cart">
            <Button className="flex items-center justify-center !w-[3.125rem] aspect-square !py-[0] text-[1.125rem] !font-normal text-primary-text bg-transparent hover:text-primary-text hover:!bg-background">
              <CartIcon color="#2C3E50" size={32} />
            </Button>
          </Link>
          {isGuest ? (
            <>
              <Link
                href="/auth/login"
                className="text-[1.25rem] hover:underline"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="text-[1.25rem] hover:underline"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/me/learning"
                className="text-[1.25rem] hover:underline"
              >
                My Learning
              </Link>
              <div className="dropdown">
                <div role="button" className="m-1">
                  <Button className="flex items-center justify-center !rounded-[50%] !w-[3.125rem] aspect-square !py-[0] text-[1.125rem] !font-normal text-primary-text bg-transparent hover:text-primary-text hover:!bg-background">
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
                  className="dropdown-content fixed z-20 w-[15.9375rem] bg-surface -mx-42 my-4 py-[1.5625rem] rounded-[1.875rem] shadow-sm"
                >
                  <Link href="#" className="block">
                    <li className="flex items-center justify-between space-x-[0.9375rem] px-[1.5625rem] py-[0.8125rem] text-[1.25rem] hover:bg-background transition-colors">
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
                  <Link href="#" className="block">
                    <li className="flex items-center justify-between px-[1.875rem] py-[0.8125rem] text-[1.25rem] hover:bg-background transition-colors">
                      My Learning
                    </li>
                  </Link>
                  <Link href="#" className="block">
                    <li className="flex items-center justify-between px-[1.875rem] py-[0.8125rem] text-[1.25rem] hover:bg-background transition-colors">
                      My Cart
                    </li>
                  </Link>

                  <hr className="my-[0.9375rem] text-border" />

                  <Link href="#" className="block">
                    <li className="flex items-center justify-between px-[1.875rem] py-[0.8125rem] text-[1.25rem] hover:bg-background transition-colors">
                      Account Settings
                    </li>
                  </Link>
                  <Link href="#" className="block" onClick={handleLogout}>
                    <li className="flex items-center justify-between px-[1.875rem] py-[0.8125rem] text-[1.25rem] hover:bg-background transition-colors">
                      Log out
                    </li>
                  </Link>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
