"use client";

import React, { useState } from "react";
import FileInput from "../ui/inputs/FileInput";
import TextInput from "../ui/inputs/TextInput";
import TextArea from "../ui/inputs/TextArea";
import { UserIcon } from "../icons/UserIcon";
import { updateUserInfo } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

const ProfileTab = () => {
  const { token } = useAuthStore();

  const [profile, setProfile] = useState({
    username: "",
    bio: "",
    image: null as string | null,
  });

  const [originalProfile, setOriginalProfile] = useState({
    username: "",
    bio: "",
    image: null as string | null,
  });

  const [saving, setSaving] = useState(false);

  const hasChanges =
    profile.username !== originalProfile.username ||
    profile.bio !== originalProfile.bio ||
    profile.image !== originalProfile.image;

  const handleChange = (key: "username" | "bio", value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (files: FileList) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!token) {
      toast.error("You must be logged in to update your profile.");
      return;
    }

    const payload: any = {};

    if (profile.username !== originalProfile.username) {
      payload.username = profile.username;
    }

    if (profile.bio !== originalProfile.bio) {
      payload.bio = profile.bio;
    }

    if (profile.image !== originalProfile.image && profile.image) {
      payload.profileImage = profile.image;
    }

    if (Object.keys(payload).length === 0) {
      toast("No changes to save.");
      return;
    }

    setSaving(true);
    try {
      await updateUserInfo(payload, token);

      setOriginalProfile({
        username: profile.username,
        bio: profile.bio,
        image: profile.image,
      });

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error(error);
      const errorMsg =
        error.message || "Failed to update profile. Please try again.";
      toast.error(
        Array.isArray(error.message) ? error.message.join(", ") : errorMsg
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="text-[#2C3E50] font-bold text-[2.5rem] mb-6 font-inter">
        Profile
      </div>
      <div className="w-full h-px bg-[#E0E6EB] mb-8"></div>

      <div className="text-[#2C3E50] font-semibold text-[1.5rem] mb-6 font-inter">
        Profile Image
      </div>

      <div className="flex gap-8 mb-8">
        <div>
          <p className="text-[#2C3E50] font-normal text-[1.125rem] mb-4 font-inter">
            Image Preview
          </p>
          <div className="w-60 h-60 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
            {profile.image ? (
              <img
                src={profile.image}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <UserIcon size={100} color="#2C3E50" />
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <p className="text-[#2C3E50] font-normal text-[1.125rem] mb-4 font-inter">
            Add / Change Image
          </p>
          <FileInput
            multiple={false}
            onFilesChange={handleImageChange}
            acceptedFileType="image/*"
          />
        </div>
      </div>

      <div className="w-full h-px bg-[#E0E6EB] mb-8 mt-8"></div>

      <div className="text-[#2C3E50] font-semibold text-[1.5rem] mb-6 font-inter">
        Basic
      </div>

      <div className="mb-6">
        <TextInput
          title="Username"
          name="username"
          value={profile.username}
          onChange={(e) => handleChange("username", e.target.value)}
          placeholder="Enter your username"
          icon={<UserIcon size={20} color="#2C3E50" />}
        />
      </div>

      <div className="mb-6">
        <TextArea
          title="Bio"
          name="bio"
          value={profile.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="Type here..."
        />
      </div>

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
    </div>
  );
};

export default ProfileTab;
