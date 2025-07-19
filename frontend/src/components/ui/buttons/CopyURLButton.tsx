// components/CopyUrlButton.tsx
"use client";

import { useCallback, useState } from "react";
import { Button } from "./Button";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { ShareIcon } from "@/components/icons/ShareIcon";

export function CopyUrlButton() {
  const [copied, setCopied] = useState(false);
  const copyUrl = useCallback(() => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Copy failed:", err);
      });
  }, []);

  return (
    <Button
      onClick={copyUrl}
      className="!w-[3.375rem] flex justify-center hover:!bg-background hover:shadow-sm transition-shadow"
    >
      {copied ? (
        <CheckIcon size={24} color="#2C3E50" />
      ) : (
        <ShareIcon size={24} color="#2C3E50" />
      )}
    </Button>
  );
}
