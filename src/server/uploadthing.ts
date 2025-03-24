// import type { NextApiRequest, NextApiResponse } from "next";
import { type FileRouter, createUploadthing } from "uploadthing/next-legacy";
// import { UploadThingError } from "uploadthing/server";

// Create new instance of uploadthing
const f = createUploadthing();

// Simple auth function (no actual auth required for this demo)
// const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "anonymous" });

// FileRouter for your app
export const ourFileRouter = {
  // Route for project image uploads
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    // .middleware(async ({ req, res }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req, res);
    //   console.log("Upload middleware executed for user:", user.id);

    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    // This function runs on the server after upload
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("metadata:", metadata);
      // console.log("Upload complete for userId:", metadata?.userId || "anonymous");
      console.log("File details:", file);

      // Use the string URL directly rather than the getter
      const fileUrl = file.ufsUrl;
      console.log("Sending URL to client:", fileUrl);

      // Whatever is returned here is sent to the clientside callback
      return { uploadedBy: "anonymous", url: fileUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
