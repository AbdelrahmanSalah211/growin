import { useCallback } from "react";

export function useCopyCurrentUrl() {
  const copyUrl = useCallback(() => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        console.log("URL copied to clipboard:", currentUrl);
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  }, []);

  return copyUrl;
}
