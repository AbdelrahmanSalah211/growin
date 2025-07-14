import React, { useState } from "react";
import { ImageUploadIcon } from "../icons/ImageUploadIcon";
import TextInput from "../ui/inputs/TextInput";
import TextArea from "../ui/inputs/TextArea";
import { UserIcon } from "../icons/UserIcon";
import { EmailAddressSignAtIcon } from "../icons/EmailAddressSignAtIcon";
import { updateUserInfo } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";

const ProfileTab = () => {
  const [username, setUsername] = useState("AbdelrahmanEmbaby");
  const [bio, setBio] = useState("");
  const [originalUsername, setOriginalUsername] = useState("AbdelrahmanEmbaby");
  const [originalBio, setOriginalBio] = useState("");
  const [saving, setSaving] = useState(false);
  const email = "you@example.com";
  const { token } = useAuthStore();

  const hasChanges = username !== originalUsername || bio !== originalBio;

  const handleSave = async () => {
    if (!token) {
      alert("You must be logged in to update your profile.");
      return;
    }

    setSaving(true);
    try {
      await updateUserInfo(
        {
          username: username,
          email: email,
          bio: bio,
        },
        token
      );
      
      setOriginalUsername(username);
      setOriginalBio(bio);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile. Please try again.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Profile Heading */}
      <div className="text-[#2C3E50] font-bold text-[2.5rem] leading-none mb-6 font-inter">
        Profile
      </div>
      {/* Horizontal Line */}
      <div className="w-full h-[0.0625rem] bg-[#E0E6EB] mb-8"></div>
      {/* Profile Image Section */}
      <div className="text-[#2C3E50] font-semibold text-[1.5rem] leading-none mb-6 font-inter">
        Profile Image
      </div>
      {/* Image Preview and Upload Area */}
      <div className="flex gap-8 mb-8">
        {/* Image Preview Area */}
        <div>
          <div className="text-[#2C3E50] font-normal text-[1.125rem] leading-none mb-4 font-inter">
            Image Preview
          </div>
          <div className="w-[15rem] h-[15rem] rounded-lg bg-gray-200 flex flex-col items-center justify-center">
            {/* Placeholder avatar icon */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
              <path d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
        </div>
        {/* Add/Change Image & Drag-and-Drop Area */}
        <div className="flex flex-col flex-1">
          <div className="text-[#2C3E50] font-normal text-[1.125rem] leading-none mb-4 font-inter">
            Add / Change Image
          </div>
          <div className="bg-white border-2 border-[#E0E6EB] rounded-lg flex flex-col items-center justify-center py-8 px-4 h-full min-h-[15rem]">
            <ImageUploadIcon size={48} color="#2C3E50" className="mb-4" />
            <div className="text-center text-[#2C3E50] font-normal text-[1.125rem] mb-2">Drag & Drop your image here</div>
            <div className="text-center text-[#5D6D7E] font-normal text-[0.75rem] mb-4">OR</div>
            <label className="bg-[#F2F5F7] rounded-lg flex items-center justify-center cursor-pointer px-8 py-3 font-bold text-[#2C3E50] text-[1.125rem]">
              Browse Files
              <input id="profile-image-upload" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>
      {/* Horizontal Line */}
      <div className="w-full h-[0.0625rem] bg-[#E0E6EB] mb-8 mt-8"></div>
      {/* Basic Section */}
      <div className="text-[#2C3E50] font-semibold text-[1.5rem] leading-none mb-6 font-inter">
        Basic
      </div>
      {/* Username Input Field */}
      <div className="mb-6">
        <TextInput
          title="Username"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter your username"
          icon={<UserIcon size={20} color="#2C3E50" />}
        />
      </div>
      {/* Bio Section */}
      <div className="mb-6">
        <TextArea
          title="Bio"
          name="bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
          placeholder="Type Here..."
        />
      </div>
      {/* Save Button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !hasChanges}
          className="bg-[#F2F5F7] hover:bg-[#E0E6EB] text-[#2C3E50] font-bold rounded-lg px-6 py-3 text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="loading loading-infinity loading-sm"></span>
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </>
  );
};

export default ProfileTab; 