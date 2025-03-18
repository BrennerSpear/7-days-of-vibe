// This is a basic implementation for uploadthing, based on their docs
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "~/server/uploadthing";

export default createRouteHandler({
  router: ourFileRouter,
});