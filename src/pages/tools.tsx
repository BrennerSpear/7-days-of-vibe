import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '~/components/nav-bar'

// Tool data structure for easy addition of new tools
interface ToolInfo {
  name: string
  url: string
  logo: string
  description: string
  freeUsage: string
  paidPlan: {
    name: string
    price: string
    features: string
  }
  hasDatabase: boolean
  hasSecrets: boolean
  difficultyLevel: 'Beginner-friendly' | 'Intermediate' | 'Advanced'
  additionalNotes: string
}

// Tool data array - add new tools here
const tools: ToolInfo[] = [
  {
    name: 'Replit',
    url: 'https://replit.com/',
    logo: '/logos/replit.png',
    description: 'Highly configurable, slightly more advanced',
    freeUsage:
      'New users receive 10 free Agent checkpoints and 20 Advanced Assistant edit requests.',
    paidPlan: {
      name: 'Replit Core',
      price: '$20',
      features: 'Full Replit Agent access and $25 in monthly compute credits.',
    },
    hasDatabase: true,
    hasSecrets: true,
    difficultyLevel: 'Intermediate',
    additionalNotes:
      'Versatile platform for both beginners and experienced developers.',
  },
  {
    name: 'Srcbook',
    url: 'https://srcbook.com/apps',
    logo: '/logos/srcbook.png',
    description: 'Lower configurability, easier for beginners',
    freeUsage:
      '15 messages (DM warpcast.com/pushix for an extra 10 free messages)',
    paidPlan: {
      name: 'Pro Plan',
      price: '$20',
      features: '250 more messages a month',
    },
    hasDatabase: false,
    hasSecrets: false,
    difficultyLevel: 'Beginner-friendly',
    additionalNotes: "Simple interface that's easy to get started with.",
  },
  {
    name: 'Lovable.dev',
    url: 'https://lovable.dev/',
    logo: '/logos/lovable.png',
    description: 'Particularly pretty designs',
    freeUsage: '5 free messages',
    paidPlan: {
      name: 'Starter Plan',
      price: '$20',
      features: '100 messages per month.',
    },
    hasDatabase: false,
    hasSecrets: false,
    difficultyLevel: 'Beginner-friendly',
    additionalNotes: 'Focus on beautiful UI designs.',
  },
  {
    name: 'V0.dev',
    url: 'https://v0.dev/',
    logo: '/logos/v0.png',
    description:
      'A tool from Vercel, a popular devtool, highly configurable, good for devs',
    freeUsage: '3 free messages',
    paidPlan: {
      name: 'Pro Plan',
      price: '$20',
      features: '10-20x more messages than Free, Import from Figma',
    },
    hasDatabase: true,
    hasSecrets: false,
    difficultyLevel: 'Intermediate',
    additionalNotes:
      'Can hook to Supabase for a database, easier for beginners.',
  },
  {
    name: 'Bolt.new',
    url: 'https://bolt.new/',
    logo: '/logos/bolt.png',
    description:
      'Can pick your preferred tech stack (NextJS, Vite, etc), so good for opinionated devs',
    freeUsage: 'Limited free usage',
    paidPlan: {
      name: 'Basic Plan',
      price: '$20',
      features: '10 million tokens (~words) per month.',
    },
    hasDatabase: true,
    hasSecrets: true,
    difficultyLevel: 'Intermediate',
    additionalNotes:
      'Asks for API keys if you need them (has a concept of a .env file). Can hook to Supabase for a database.',
  },
]

export default function ToolsComparison() {
  return (
    <>
      <Head>
        <title>Vibe Code Tools Comparison | 7 Days of Vibe Coding</title>
        <meta
          name="description"
          content="Compare different vibe code tools to find the best one for your project."
        />
      </Head>

      <div className="min-h-screen flex flex-col">
        <NavBar />

        {/* Main Content */}
        <main className="flex-grow pt-24 pb-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 text-center">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                  Vibe Code Tools Comparison
                </span>
              </h1>

              <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-12">
                Compare different vibe code tools to find the one that best fits
                your project needs.
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto pb-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-purple-100 dark:bg-purple-900/50">
                      <th className="p-4 text-left border-b dark:border-gray-700 font-semibold w-[180px]">
                        Tool
                      </th>
                      <th className="p-4 text-left border-b dark:border-gray-700 font-semibold">
                        Description
                      </th>
                      <th className="p-4 text-left border-b dark:border-gray-700 font-semibold">
                        Free Usage
                      </th>
                      <th className="p-4 text-left border-b dark:border-gray-700 font-semibold">
                        Paid Plan
                      </th>
                      <th className="p-4 text-center border-b dark:border-gray-700 font-semibold">
                        Database
                      </th>
                      <th className="p-4 text-center border-b dark:border-gray-700 font-semibold">
                        API Keys
                      </th>
                      <th className="p-4 text-left border-b dark:border-gray-700 font-semibold">
                        Difficulty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tools.map((tool, index) => (
                      <tr
                        key={tool.name}
                        className={
                          index % 2 === 0
                            ? 'bg-white/50 dark:bg-gray-800/20'
                            : 'bg-purple-50/50 dark:bg-gray-800/40'
                        }
                      >
                        <td className="p-4 border-b dark:border-gray-700 align-top">
                          <div className="flex flex-col gap-2">
                            <div className="font-bold text-base">
                              {tool.name}
                            </div>
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-purple-600 dark:text-purple-400 hover:underline break-words"
                            >
                              {tool.url}
                            </a>
                          </div>
                        </td>
                        <td className="p-4 border-b dark:border-gray-700 align-top">
                          <div className="text-sm">
                            {tool.description}
                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                              {tool.additionalNotes}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b dark:border-gray-700 align-top">
                          <div className="text-sm">{tool.freeUsage}</div>
                        </td>
                        <td className="p-4 border-b dark:border-gray-700 align-top">
                          <div className="text-sm">
                            <div className="font-semibold">
                              {tool.paidPlan.name} - {tool.paidPlan.price}
                            </div>
                            <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                              {tool.paidPlan.features}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b dark:border-gray-700 text-center align-middle">
                          <span
                            className={
                              tool.hasDatabase
                                ? 'text-green-600 font-bold'
                                : 'text-red-600'
                            }
                          >
                            {tool.hasDatabase ? '✓' : '✗'}
                          </span>
                        </td>
                        <td className="p-4 border-b dark:border-gray-700 text-center align-middle">
                          <span
                            className={
                              tool.hasSecrets
                                ? 'text-green-600 font-bold'
                                : 'text-red-600'
                            }
                          >
                            {tool.hasSecrets ? '✓' : '✗'}
                          </span>
                        </td>
                        <td className="p-4 border-b dark:border-gray-700 align-middle">
                          <span
                            className={
                              tool.difficultyLevel === 'Beginner-friendly'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs'
                                : tool.difficultyLevel === 'Intermediate'
                                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs'
                                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded-full text-xs'
                            }
                          >
                            {tool.difficultyLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Version - Cards */}
              <div className="md:hidden space-y-6 mt-6">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm p-4 border dark:border-gray-700"
                  >
                    <div className="font-bold text-lg mb-2">{tool.name}</div>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-purple-600 dark:text-purple-400 hover:underline block mb-3"
                    >
                      {tool.url}
                    </a>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          Description
                        </div>
                        <div className="text-sm">{tool.description}</div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          Free Usage
                        </div>
                        <div className="text-sm">{tool.freeUsage}</div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          Paid Plan
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold">
                            {tool.paidPlan.name} - {tool.paidPlan.price}
                          </span>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {tool.paidPlan.features}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                            Database
                          </div>
                          <div className="text-sm">
                            <span
                              className={
                                tool.hasDatabase
                                  ? 'text-green-600 font-bold'
                                  : 'text-red-600'
                              }
                            >
                              {tool.hasDatabase ? '✓' : '✗'}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                            API Keys
                          </div>
                          <div className="text-sm">
                            <span
                              className={
                                tool.hasSecrets
                                  ? 'text-green-600 font-bold'
                                  : 'text-red-600'
                              }
                            >
                              {tool.hasSecrets ? '✓' : '✗'}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                            Difficulty
                          </div>
                          <div className="text-sm">
                            <span
                              className={
                                tool.difficultyLevel === 'Beginner-friendly'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs'
                                  : tool.difficultyLevel === 'Intermediate'
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs'
                                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded-full text-xs'
                              }
                            >
                              {tool.difficultyLevel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {tool.additionalNotes && (
                        <div>
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                            Additional Notes
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {tool.additionalNotes}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All pricing and features are current as of March 2025. Please
                  check the official websites for the most up-to-date
                  information.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t dark:border-gray-800 py-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 7 Days of Vibe Coding
              </p>
              <a
                href="mailto:brenner@7daysofvibe.com"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
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
