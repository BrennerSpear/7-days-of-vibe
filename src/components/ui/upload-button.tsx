import { useCallback } from "react";
import { UploadButton as UTButton } from "@uploadthing/react";
import type { OurFileRouter } from "~/server/uploadthing";

interface UploadButtonProps {
  onUploadComplete: (url: string) => void;
  onUploadError: (error: Error) => void;
}

export function UploadButton({ onUploadComplete, onUploadError }: UploadButtonProps) {
  const handleComplete = useCallback((res: { url: string }[]) => {
    if (res?.[0]?.url) {
      onUploadComplete(res[0].url);
    }
  }, [onUploadComplete]);

  return (
    <UTButton<OurFileRouter, any>
      endpoint="imageUploader"
      onClientUploadComplete={handleComplete}
      onUploadError={onUploadError}
      className="ut-button:bg-purple-600 ut-button:hover:bg-purple-700 ut-button:text-white ut-button:rounded-md ut-button:px-4 ut-button:py-2 ut-button:text-sm ut-button:font-medium"
    />
  );
}