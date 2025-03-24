import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { NavBar } from '~/components/nav-bar'
import { PromptModal } from '~/components/prompt-form'
import { PromptsList } from '~/components/prompts-list'
import { Button } from '~/components/ui/button'
import { useToast } from '~/components/ui/toast'

const PromptsPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handlePromptSubmitSuccess = () => {
    closeModal()
    showToast(
      'Your prompt idea has been submitted successfully! It will be reviewed before appearing on the site.',
      'success',
    )
  }

  return (
    <>
      <Head>
        <title>Prompt Ideas | 7 Days of Code</title>
        <meta name="description" content="Share and discover AI prompt ideas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white">
            Prompt Ideas
          </h1>
          <p className="mb-6 text-center text-lg text-gray-700 dark:text-gray-300">
            Browse community-submitted prompt ideas for your coding projects
          </p>
          <Button onClick={openModal} className="px-6">
            Submit a Prompt Idea
          </Button>
        </div>

        <div className="mb-12">
          <PromptsList />
        </div>

        <PromptModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmitSuccess={handlePromptSubmitSuccess}
        />
        <ToastContainer />
      </main>
    </>
  )
}

export default PromptsPage
