'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUser } from "@/lib/auth-actions";
import TextInput from "@/components/ui/inputs/TextInput";
import TextArea from "@/components/ui/inputs/TextArea";
import FileInput from "@/components/ui/inputs/FileInput";

export default function ProfilePage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    profileImage: "",
    bio: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [imageFileList, setImageFileList] = useState<FileList | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [infoChanged, setInfoChanged] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const userString = await getUser();
      if (userString) {
        const userObj = JSON.parse(userString);
        setUser(userObj);
        setUsername(userObj.username || "");
        setBio(userObj.bio || "");
        setImagePreview(userObj.profileImage || "");
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    setInfoChanged(
      username !== user.username || bio !== (user.bio || "")
    );
  }, [username, bio, user]);

  useEffect(() => {
    setImageChanged(!!imageFileList);
    if (imageFileList && imageFileList.length > 0) {
      setImagePreview(URL.createObjectURL(imageFileList[0]));
    } else {
      setImagePreview(user.profileImage || "");
    }
  }, [imageFileList, user.profileImage]);

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle image upload logic here
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle info update logic here
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-base-100 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Profile Image</h2>
        <form className="flex gap-8 items-start" onSubmit={handleImageSubmit}>
          {/* Image Preview */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-base-content/70 mb-2">Image Preview</span>
            <div className="w-32 h-32 rounded-lg bg-base-200 flex items-center justify-center">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile Preview"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M16 20v-2a4 4 0 0 0-8 0v2" />
                </svg>
              )}
            </div>
          </div>
          {/* Image Upload */}
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-sm text-base-content/70 mb-2">Add / Change Image</span>
            <FileInput
              id="profile-image-upload"
              acceptedFileType="image/*"
              files={imageFileList}
              onFilesChange={setImageFileList}
              title="Browse Files"
            />
          </div>
          <div className="flex flex-col justify-end h-32">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={!imageChanged}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="bg-base-100 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Basic</h2>
        <form className="flex flex-col gap-4" onSubmit={handleInfoSubmit}>
          <TextInput
            title="Username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
          <TextArea
            title="Bio"
            name="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Type Here..."
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={!infoChanged}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
