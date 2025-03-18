import { createUploadthing, type FileRouter } from "uploadthing/next";

// Create new instance of uploadthing
const f = createUploadthing();

// Define file routes
export const ourFileRouter = {
  // Route for project image uploads - using a simpler configuration
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(() => {
      // Simple middleware that just returns a user ID
      return { userId: "anonymous" };
    })
    .onUploadComplete(({ file }) => {
      // Just return the URL directly to simplify the response
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;