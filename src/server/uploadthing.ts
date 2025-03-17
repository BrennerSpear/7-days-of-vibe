import { createUploadthing, type FileRouter } from "uploadthing/next";

// Create new instance of uploadthing
const f = createUploadthing();

// Define file routes
export const ourFileRouter = {
  // Route for project image uploads
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1
    }
  })
    .middleware(() => {
      // This code runs on your server before upload
      return { userId: "anonymous" };
    })
    .onUploadComplete(({ file }) => {
      // This code runs on your server after upload
      console.log("Upload complete:", file.url);
      
      // Return the file URL for client use
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;