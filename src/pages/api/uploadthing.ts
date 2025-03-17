import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "~/server/uploadthing";
 
// Export handler for Next.js Pages API
export default createRouteHandler({
  router: ourFileRouter,
});