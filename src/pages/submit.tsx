import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { UploadButton } from "~/components/ui/upload-button";
import { api } from "~/utils/api";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  link: z.string().min(1, "Link is required"),
  farcasterUsername: z.string().min(1, "Farcaster username is required"),
  imageUrl: z.string().url("Please upload an image"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      farcasterUsername: "",
      imageUrl: "",
    },
  });

  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Error submitting project:", error);
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    setIsSubmitting(true);
    createProject.mutate(data);
  };

  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
    setValue("imageUrl", url);
    setUploadError("");
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);
    setUploadError("Error uploading image. Please try again.");
  };

  const linkValue = watch("link");

  return (
    <>
      <Head>
        <title>Submit Your Project - 7 Days of Vibe Coding</title>
        <meta name="description" content="Submit your project for the 7 Days of Vibe Coding challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="fixed top-0 right-0 left-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-50 border-b dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex justify-between py-4">
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  ← Back to Home
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-24">
          <div className="container px-4 mx-auto py-8">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                Submit Your Project
              </h1>

              {isSuccess ? (
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm border dark:border-gray-700 text-center">
                  <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Project Submitted!</h2>
                  <p className="mb-6 text-lg">Your project has been submitted for review. Thank you for participating!</p>
                  <Link
                    href="/"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white rounded-md px-6 py-3 font-medium"
                  >
                    Return to Homepage
                  </Link>
                </div>
              ) : (
                <form 
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border dark:border-gray-700"
                >
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-1">Project Title</label>
                      <input
                        id="title"
                        type="text"
                        className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Enter your project title"
                        {...register("title")}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        id="description"
                        rows={4}
                        className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Describe your project"
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                      )}
                    </div>

                    {/* Link */}
                    <div>
                      <label htmlFor="link" className="block text-sm font-medium mb-1">Project Link</label>
                      <div className="flex">
                        <div className="bg-gray-100 dark:bg-gray-600 px-3 py-2 rounded-l-md border border-r-0 dark:border-gray-500 flex items-center">
                          <p className="text-gray-700 dark:text-gray-300">https://warpcast.com/</p>
                        </div>
                        <input
                          id="link"
                          type="text"
                          className="flex-grow px-4 py-2 rounded-r-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          placeholder="~/channel/your-project"
                          {...register("link")}
                        />
                      </div>
                      {errors.link && (
                        <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
                      )}
                    </div>

                    {/* Farcaster Username */}
                    <div>
                      <label htmlFor="farcasterUsername" className="block text-sm font-medium mb-1">Farcaster Username</label>
                      <input
                        id="farcasterUsername"
                        type="text"
                        className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Your Farcaster username"
                        {...register("farcasterUsername")}
                      />
                      {errors.farcasterUsername && (
                        <p className="text-red-500 text-sm mt-1">{errors.farcasterUsername.message}</p>
                      )}
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Image</label>
                      
                      {imageUrl ? (
                        <div className="mb-4">
                          <div className="relative w-full h-48 rounded-md overflow-hidden">
                            <img 
                              src={imageUrl} 
                              alt="Project Preview" 
                              className="w-full h-full object-cover" 
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImageUrl("");
                                setValue("imageUrl", "");
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <UploadButton
                            onUploadComplete={handleUploadComplete}
                            onUploadError={handleUploadError}
                          />
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Upload a screenshot or image related to your project (max 4MB)
                          </p>
                          {uploadError && (
                            <p className="text-red-500 text-sm mt-1">{uploadError}</p>
                          )}
                          {errors.imageUrl && (
                            <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-70"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Project"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t dark:border-gray-800 py-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-end">
              <a
                href="mailto:brenner@7daysofvibe.com"
                className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}