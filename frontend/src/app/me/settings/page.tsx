'use client'
import React, { useState } from "react";
import ProfileTab from "../../../components/accountSettings/ProfileTab";
import AccountSecurityTab from "../../../components/accountSettings/AccountSecurityTab";
import CloseAccountTab from "../../../components/accountSettings/CloseAccountTab";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { UserIcon } from "@/components/icons/UserIcon";

export default function AccountSettingsLayout() {
  useHydrateAuth();
  const [selectedTab, setSelectedTab] = useState<string>("Profile");
  const menuItems = [
    { label: "Profile" },
    { label: "Account Security" },
    { label: "Close Account" },
  ];
  const [email, setEmail] = useState<string>("you@example.com");
  const [editingEmail, setEditingEmail] = useState<boolean>(false);

  return (
    <div className="min-h-screen w-full bg-[#F2F5F7] rounded-[0.125rem] flex items-start justify-center">
      <div className="w-[75rem] rounded-[3.75rem] bg-white mt-8 mb-12 p-12 flex shadow min-h-[40rem]">
        {/* Sidebar */}
        <div className="w-[13.1875rem] flex flex-col items-center pt-8 h-full">
          {/* Avatar Frame */}
          <div className="relative w-[9.375rem] p-[2.5rem] rounded-[12.5rem] bg-white shadow-[0_0.0625rem_0.125rem_0_#7C94AF14,0_0.125rem_0.25rem_0_#7C94AF1F] mb-4 flex items-center justify-center">
            {/* Avatar SVG */}
            <UserIcon color="#2C3E50" size={80}/>
          </div>
          {/* Name */}
          <div className="font-bold text-[1.25rem] leading-none text-[#2C3E50] mb-1">
            AbdelrahmanEmbaby
          </div>
          {/* Email */}
          <div className="text-[1rem] font-normal leading-none text-[#2C3E50] mb-8">
            you@example.com
          </div>
          {/* Sidebar Menu */}
          <div className="flex flex-col w-full space-y-4 mt-4">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className={`text-[#2C3E50] text-[1.25rem] leading-none cursor-pointer px-4 py-2 rounded-[0.5rem] transition font-${
                  selectedTab === item.label ? "bold" : "normal"
                } ${selectedTab === item.label ? "bg-[#F2F5F7]" : ""}`}
                onClick={() => setSelectedTab(item.label)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        {/* Vertical Divider */}
        {/* <div className="w-[0.0625rem] bg-[#E0E6EB] mx-[2rem] self-stretch"></div> */}
        {/* Main Content placeholder */}
        <div className="flex-1 flex flex-col pt-8 pl-8 h-full">
          {selectedTab === "Profile" && <ProfileTab />}
          {selectedTab === "Account Security" && <AccountSecurityTab />}
          {selectedTab === "Close Account" && <CloseAccountTab />}
        </div>
      </div>
    </div>
  );
}