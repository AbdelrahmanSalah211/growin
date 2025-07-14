'use client'
import React, { useState } from "react";
import ProfileTab from "../../../components/accountSettings/ProfileTab";
import AccountSecurityTab from "../../../components/accountSettings/AccountSecurityTab";
import CloseAccountTab from "../../../components/accountSettings/CloseAccountTab";

export default function AccountSettingsLayout() {
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
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z" stroke="#2C3E50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22" stroke="#2C3E50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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
                className={`text-[#2C3E50] text-[1.25rem] leading-none cursor-pointer px-4 py-2 rounded-[0.5rem] transition font-${selectedTab === item.label ? "bold" : "normal"} ${selectedTab === item.label ? "bg-[#F2F5F7]" : ""}`}
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
          {selectedTab === "Profile" && (
            <ProfileTab />
          )}
          {selectedTab === "Account Security" && (
            <AccountSecurityTab />
          )}
          {selectedTab === "Close Account" && (
            <CloseAccountTab />
          )}
        </div>
      </div>
    </div>
  );
}