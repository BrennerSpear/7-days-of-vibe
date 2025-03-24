"use client";

import { type PromptIdea } from "@prisma/client";
import { api } from "~/utils/api";

export function PromptsList() {
  const { data: prompts, isLoading, error } = api.prompt.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-white"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading prompt ideas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-800 dark:text-red-100">
        Failed to load prompts
      </div>
    );
  }

  if (!prompts || prompts.length === 0) {
    return (
      <div className="my-8 text-center text-gray-600 dark:text-gray-400">
        No prompts available yet. Be the first to submit one!
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}

function PromptCard({ prompt }: { prompt: PromptIdea }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <p className="mb-3 text-gray-700 dark:text-gray-300">{prompt.text}</p>
      {prompt.farcasterUsername && (
        <div className="text-right text-sm font-light text-gray-500 dark:text-gray-400">
          — <a 
              href={`https://warpcast.com/${prompt.farcasterUsername}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-600 dark:hover:text-purple-400 hover:underline"
            >
              {prompt.farcasterUsername}
            </a>
        </div>
      )}
    </div>
  );
}