"use client";
import { FormEvent, useEffect, useState } from "react";
import TextInput from "@/components/ui/inputs/TextInput";
import { UserIcon } from "@/components/icons/UserIcon";
import TextArea from "@/components/ui/inputs/TextArea";
import { Button } from "@/components/ui/buttons/Button";
import { ImageUploadIcon } from "@/components/icons/ImageUploadIcon";
import FileInput from "@/components/ui/inputs/FileInput";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { updateUserInfo } from "@/services/userService";
import { setUser } from "@/lib/auth-actions";
import { validateUsername } from "@/utils/validate";

export default function ProfilePage() {
  useHydrateAuth();
  const { user, token } = useAuthStore();

  const [initialData, setInitialData] = useState({
    username: "",
    bio: "",
    profileImage: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profileImage: "",
    imageFile: null as File | null,
  });

  const [isLoading, setIsLoading] = useState({
    basic: false,
    image: false,
  });

  const [isPageLoading, setIsPageLoading] = useState(true);

  const [usernameErrors, setUsernameErrors] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const { username = "", bio = "", profileImage = "" } = user;
      setInitialData({ username, bio: bio || "", profileImage });
      setFormData({ username, bio: bio || "", profileImage, imageFile: null });
      setIsPageLoading(false);
    }
  }, [user]);

  const hasTextChanges =
    formData.username !== initialData.username ||
    formData.bio !== initialData.bio;

  const hasImageChange = !!formData.imageFile;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      const { isValid, messages } = validateUsername(value);

      setUsernameErrors(isValid ? [] : messages);
    }
  };

  const handleBasicSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!hasTextChanges || !token || usernameErrors.length > 0) return;

    setIsLoading((prev) => ({ ...prev, basic: true }));

    const formDataObj = new FormData();
    formDataObj.append("username", formData.username);
    formDataObj.append("bio", formData.bio);

    try {
      const updated = await updateUserInfo(formDataObj, token);
      setUser(updated);

      setInitialData((prev) => ({
        ...prev,
        username: updated.username,
        bio: updated.bio,
      }));

      setFormData((prev) => ({
        ...prev,
        username: updated.username,
        bio: updated.bio,
      }));
    } catch (err) {
      console.error("Failed to save basic info", err);
    } finally {
      setIsLoading((prev) => ({ ...prev, basic: false }));
    }
  };

  const handleImageSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.imageFile || !token) return;

    setIsLoading((prev) => ({ ...prev, image: true }));

    try {
      const formDataObj = new FormData();
      formDataObj.append("file", formData.imageFile);

      const updated = await updateUserInfo(formDataObj, token);
      setUser(updated);

      setInitialData((prev) => ({
        ...prev,
        profileImage: updated.profileImage,
      }));

      setFormData((prev) => ({
        ...prev,
        profileImage: updated.profileImage,
        imageFile: null,
      }));
    } catch (err) {
      console.error("Failed to upload image", err);
    } finally {
      setIsLoading((prev) => ({ ...prev, image: false }));
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {isPageLoading ? (
        <p className="w-full h-full flex justify-center items-center text-primary-text">
          <span className="loading loading-6xl loading-ring"></span>
        </p>
      ) : (
        <>
          <h1 className="text-3xl font-bold p-7">Profile</h1>
          <hr className="text-border" />
          <section className="space-y-5 p-7">
            <h2 className="text-2xl font-semibold">Basic</h2>
            <form onSubmit={handleBasicSubmit} className="flex flex-col gap-5">
              <div>
                <TextInput
                  title="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  icon={<UserIcon color="var(--color-primary-text)" />}
                />
                <span className="block  text-base text-primary-text">
                  {usernameErrors.map((err) => (
                    <p key={err}>{err}</p>
                  ))}
                </span>
              </div>
              <TextArea
                title="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
              <Button
                className="!w-fit self-end !px-6"
                type="submit"
                buttonProps={{
                  disabled:
                    !hasTextChanges ||
                    isLoading.basic ||
                    usernameErrors.length > 0,
                }}
              >
                Save
              </Button>
            </form>
          </section>
          <hr className="text-border" />
          <section className="w-full space-y-5 p-7">
            <h2 className="text-2xl font-semibold">Profile Image</h2>
            <div className="flex gap-5">
              <div className="flex flex-col gap-[0.625rem]">
                <p>Image Preview</p>
                {formData.profileImage ? (
                  <Image
                    src={formData.profileImage}
                    width={100}
                    height={100}
                    alt="Profile Image"
                    className="w-[28rem] border border-border aspect-square rounded-[0.625rem] object-cover"
                  />
                ) : (
                  <div className="w-[18.75rem] aspect-square rounded-[0.625rem] bg-background flex items-center justify-center">
                    <UserIcon
                      color="var(--color-secondary-text)"
                      size={80}
                      strokeWidth={0.5}
                    />
                  </div>
                )}
              </div>
              <form
                onSubmit={handleImageSubmit}
                className="w-full flex flex-col gap-5"
              >
                <div className="flex flex-col gap-[0.625rem]">
                  <label htmlFor="profile-image" className="text-primary-text">
                    Add / Change Image
                  </label>
                  <FileInput
                    acceptedFileType="image/*"
                    id="profile-image"
                    onFilesChange={(files) => {
                      const file = files[0];
                      if (file) {
                        setFormData((prev) => ({
                          ...prev,
                          imageFile: file,
                          profileImage: URL.createObjectURL(file),
                        }));
                      }
                    }}
                    icon={
                      <ImageUploadIcon
                        color="var(--color-secondary-text)"
                        size={80}
                        strokeWidth={0.5}
                      />
                    }
                  />
                </div>
                <Button
                  className="!w-fit self-end !px-6"
                  type="submit"
                  buttonProps={{
                    disabled: !hasImageChange || isLoading.image,
                  }}
                >
                  Save
                </Button>
              </form>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
