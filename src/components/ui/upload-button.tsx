import { useCallback } from "react";
import { UploadButton as UTButton } from "@uploadthing/react";
import type { OurFileRouter } from "~/server/uploadthing";

interface UploadButtonProps {
  onUploadComplete: (url: string) => void;
  onUploadError: (error: Error) => void;
  onUploadStart?: () => void;
}

// Using a simpler component for more reliable uploads
export function UploadButton({ onUploadComplete, onUploadError, onUploadStart }: UploadButtonProps) {
  // Use a very simple handler to avoid serialization issues
  const handleComplete = useCallback((res: any) => {
    if (res && res[0] && res[0].url) {
      onUploadComplete(res[0].url);
    }
  }, [onUploadComplete]);

  return (
    <div className="custom-upload">
      <UTButton<OurFileRouter, any>
        endpoint="imageUploader"
        onClientUploadComplete={handleComplete}
        onUploadError={onUploadError}
        onUploadBegin={onUploadStart}
        appearance={{
          button: {
            backgroundColor: "#9333EA",
            color: "white",
            fontSize: "14px"
          }
        }}
      />
    </div>
  );
}