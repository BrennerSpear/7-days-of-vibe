// API Route for UploadThing file uploads
import { createRouteHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "~/server/uploadthing";

// Create and export the route handler
export default createRouteHandler({
  router: ourFileRouter,
});