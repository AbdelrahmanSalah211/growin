import React from "react";
import FileInput from "../ui/inputs/FileInput";
import { UserIcon } from "../icons/UserIcon";
import { Button } from "../ui/buttons/Button";

interface ImageChangerProps {
  value: string | null;
  onChange: (file: File | null) => void;
  onSave: () => void;
}

const ImageChanger: React.FC<ImageChangerProps> = ({
  value,
  onChange,
  onSave,
}) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(value);

  React.useEffect(() => {
    setPreview(value);
    if (!value) setFile(null);
  }, [value]);

  const handleFilesChange = (files: FileList) => {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    } else {
      setFile(null);
      setPreview(value);
      onChange(null);
    }
  };

  const isImageSelected = !!file && file.type.startsWith("image/");

  return (
    <div className="flex gap-8">
      <div>
        <p className="text-primary-text font-inter font-normal text-[1.125rem] leading-none mb-4">
          Image Preview
        </p>
        <div className="w-[18rem] h-[18rem] rounded-[0.625rem] bg-background flex items-center justify-center overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <UserIcon size={192} color="var(--color-primary-text)" strokeWidth={0.5}/>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <p className="text-primary-text font-inter font-normal text-[1.125rem] leading-none mb-4 w-[11.125rem] h-[1.375rem]">
          Add / Change Image
        </p>
        <div className="w-[28rem] h-[18rem]">
          <FileInput
            multiple={false}
            onFilesChange={handleFilesChange}
            acceptedFileType="image/*"
          />
        </div>
        <div className="mt-8 ml-10">
          <Button
            type="button"
            onClick={onSave}
            buttonProps={{ disabled: !isImageSelected }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageChanger;
