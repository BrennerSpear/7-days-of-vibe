import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { NavBar } from '~/components/nav-bar'
import { ProjectSubmissionForm } from '~/components/project-form'

export default function SubmitPage() {
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmitSuccess = () => {
    setIsSuccess(true)
  }

  return (
    <>
      <Head>
        <title>Submit Your Project - 7 Days of Vibe Coding</title>
        <meta
          name="description"
          content="Submit your project for the 7 Days of Vibe Coding challenge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <NavBar />

        {/* Main Content */}
        <main className="flex-grow pt-24">
          <div className="container px-4 mx-auto py-8">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                Submit Your Project
              </h1>

              {isSuccess ? (
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm border dark:border-gray-700 text-center">
                  <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                    Project Submitted!
                  </h2>
                  <p className="mb-6 text-lg">
                    Your project has been submitted for review. Thank you for
                    participating!
                  </p>
                  <Link
                    href="/"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white rounded-md px-6 py-3 font-medium"
                  >
                    Return to Homepage
                  </Link>
                </div>
              ) : (
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border dark:border-gray-700">
                  <ProjectSubmissionForm onSuccess={handleSubmitSuccess} />
                </div>
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
  )
}
