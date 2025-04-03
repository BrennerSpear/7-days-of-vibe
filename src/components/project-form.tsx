'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '~/utils/api'
import { UploadButton } from '~/utils/uploadthing'

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  link: z.string().url('Please enter a valid URL'),
  farcasterUsername: z.string().optional(),
  imageUrl: z.string().url('Please upload an image'),
})

export type ProjectFormValues = z.infer<typeof projectSchema>

export function ProjectSubmissionModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
}) {
  // Add Escape key listener
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose()
      }
    }

    // Add event listener when the modal is open
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    // Cleanup the event listener when component unmounts or modal closes
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop (not the modal itself)
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Submit Your Project
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ProjectSubmissionForm onSuccess={onSubmitSuccess} />
      </div>
    </div>
  )
}

export function ProjectSubmissionForm({
  onSuccess,
}: {
  onSuccess?: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [uploadError, setUploadError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      link: '',
      farcasterUsername: '',
      imageUrl: '',
    },
  })

  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      setIsSuccess(true)
      setIsSubmitting(false)
      if (onSuccess) {
        onSuccess()
      }
    },
    onError: (error) => {
      console.error('Error submitting project:', error)
      setIsSubmitting(false)
    },
  })

  const onSubmit = (data: ProjectFormValues) => {
    setIsSubmitting(true)
    createProject.mutate(data)
  }

  // Type for the upload response
  type UploadResponse = {
    name: string
    size: number
    key: string
    uploadedBy?: string
    url?: string
  }[]

  const handleUploadComplete = (res: UploadResponse) => {
    try {
      if (res && Array.isArray(res) && res.length > 0 && res[0]?.url) {
        setImageUrl(res[0].url)
        setValue('imageUrl', res[0].url)
        setUploadError('')
      } else {
        console.error('Invalid upload response format:', res)
        setUploadError('Failed to get upload URL. Please try again.')
      }
    } catch (error) {
      console.error('Error processing upload response:', error)
      setUploadError('Error processing upload. Please try again.')
    }
  }

  const handleUploadError = (error: Error) => {
    console.error('Upload error:', error)
    setUploadError('Error uploading image. Please try again.')
  }

  const handleUploadStart = () => {
    // Upload is starting, clear any previous errors
    setUploadError('')
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
          Project Submitted!
        </h2>
        <p className="mb-6 text-lg">
          Your project has been submitted for review. Thank you for
          participating!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Project Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="Enter your project title"
          {...register('title')}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="Describe your project"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Link */}
      <div>
        <label htmlFor="link" className="block text-sm font-medium mb-1">
          Project Link
        </label>
        <input
          id="link"
          type="text"
          className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="https://your-project-link.com"
          {...register('link')}
        />
        {errors.link && (
          <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
        )}
      </div>

      {/* Farcaster Username */}
      <div>
        <label
          htmlFor="farcasterUsername"
          className="block text-sm font-medium mb-1"
        >
          Farcaster Username{' '}
          <span className="text-gray-500 text-xs">(optional)</span>
        </label>
        <div className="flex">
          <div className="bg-gray-100 dark:bg-gray-600 px-3 py-2 rounded-l-md border border-r-0 dark:border-gray-500 flex items-center">
            <p className="text-gray-700 dark:text-gray-300">
              https://warpcast.com/
            </p>
          </div>
          <input
            id="farcasterUsername"
            type="text"
            className="flex-grow px-4 py-2 rounded-r-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="username"
            {...register('farcasterUsername')}
          />
        </div>
        {errors.farcasterUsername && (
          <p className="text-red-500 text-sm mt-1">
            {errors.farcasterUsername.message}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Project Image</label>

        {imageUrl ? (
          <div className="mb-4">
            <div className="relative w-full h-48 rounded-md overflow-hidden">
              {/* Using img element for preview in form */}
              <img
                src={imageUrl}
                alt="Project Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImageUrl('')
                  setValue('imageUrl', '')
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-3 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Upload an image for your project (Max 4MB)
              </p>
              <div className="w-full max-w-[200px]">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    handleUploadComplete(res)
                  }}
                  onUploadError={(error) => {
                    handleUploadError(error)
                  }}
                  onUploadBegin={handleUploadStart}
                  className="ut-button:bg-purple-600 ut-button:hover:bg-purple-700 ut-button:text-white"
                />
              </div>
            </div>
            {uploadError && (
              <p className="text-red-500 text-sm mt-1">{uploadError}</p>
            )}
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.imageUrl.message}
              </p>
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
          {isSubmitting ? 'Submitting...' : 'Submit Project'}
        </button>
      </div>
    </form>
  )
}
