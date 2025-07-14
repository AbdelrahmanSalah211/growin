import React from "react";

const CloseAccountTab = () => (
  <div className="p-8">
    {/* Close Account Heading */}
    <div className="font-inter font-bold text-[2.5rem] leading-none text-[#2C3E50] w-[21.75rem] h-[3rem] mb-6">
      Close Account
    </div>
    {/* Horizontal line */}
    <div className="w-[48rem] border-t border-[#E0E6EB] mx-auto mb-8" />
    {/* Warning text */}
    <div className="font-inter font-bold text-[1.125rem] leading-none text-[#2C3E50] w-[43.4375rem] h-[5.5rem] mb-8">
      <span className="text-[#E53935]">Warning:</span> If you close your account, you will be unsubscribed from all 2 of your courses and will lose access to your account and data associated with your account forever, even if you choose to create a new account using the same email address in the future.
    </div>
    {/* Buttons */}
    <div className="flex flex-col gap-4 max-w-xs">
      <button className="bg-[#E53935] text-white font-bold rounded-lg py-3 text-lg w-full transition hover:bg-[#c62828] cursor-pointer">Close account</button>
    </div>
  </div>
);

export default CloseAccountTab; 