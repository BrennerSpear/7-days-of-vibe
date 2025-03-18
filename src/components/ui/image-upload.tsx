import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  onUploadError: (error: Error) => void;
  onUploadStart?: () => void;
}

export function ImageUpload({ onUploadComplete, onUploadError, onUploadStart }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      // Call upload start handler if provided
      if (onUploadStart) onUploadStart();
      
      // Set uploading state
      setIsUploading(true);

      // Create form data for upload
      const formData = new FormData();
      const file = files[0];
      if (file) formData.append('file', file);

      // Upload the file
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Check if upload was successful
      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error ?? 'Error uploading file');
      }

      // Get the URL of the uploaded file
      const data = await response.json() as { url: string };
      onUploadComplete(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError(error instanceof Error ? error : new Error('Unknown upload error'));
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload">
      <label 
        htmlFor="file-upload"
        className="block w-full px-4 py-2 text-center text-white bg-purple-600 hover:bg-purple-700 rounded-md cursor-pointer font-medium transition duration-200"
      >
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleUpload}
        accept="image/*"
        disabled={isUploading}
        ref={fileInputRef}
      />
    </div>
  );
}