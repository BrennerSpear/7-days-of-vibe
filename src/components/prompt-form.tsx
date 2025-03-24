'use client'

import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { api } from '~/utils/api'

export function PromptModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
}) {
  const [prompt, setPrompt] = useState('')
  const [username, setUsername] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

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

  const createPrompt = api.prompt.create.useMutation({
    onSuccess: () => {
      setPrompt('')
      setUsername('')
      setSubmitting(false)
      // Notify parent component of success and close immediately
      onSubmitSuccess()
    },
    onError: (error) => {
      setError(error.message)
      setSubmitting(false)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    if (!prompt) {
      setError('Please enter a prompt idea')
      setSubmitting(false)
      return
    }

    createPrompt.mutate({
      text: prompt,
      farcasterUsername: username || undefined,
    })
  }

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
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Submit a Prompt Idea
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="prompt"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Prompt Idea
            </label>
            <textarea
              id="prompt"
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter your prompt idea here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Farcaster Username{' '}
              <span className="text-xs text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              id="username"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="flex-1">
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
        {error && (
          <div className="mt-4 rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-800 dark:text-red-100">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
