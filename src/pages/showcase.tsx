import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NavBar } from '~/components/nav-bar'
import { ProjectGrid } from '~/components/project-grid'

export default function Showcase() {
  const [activeWeek, setActiveWeek] = useState<number | undefined>(undefined)
  const [availableWeeks, setAvailableWeeks] = useState<number[]>([1, 2])

  // Update available weeks based on current date
  useEffect(() => {
    const currentDate = new Date()
    const week3StartDate = new Date('2025-03-31T00:00:00Z')

    if (currentDate >= week3StartDate) {
      setAvailableWeeks([1, 2, 3])
    }
  }, [])

  return (
    <>
      <Head>
        <title>Community Projects - 7 Days of Vibe Coding</title>
        <meta
          name="description"
          content="Check out projects built during the 7 Days of Vibe Coding challenge."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <NavBar />

        {/* Main Content */}
        <main className="flex-grow pt-24">
          <div className="container px-4 mx-auto py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                Community Projects
              </h1>

              {/* Week Tabs */}
              <div className="flex justify-center mb-10">
                <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-1 inline-flex">
                  <button
                    onClick={() => setActiveWeek(undefined)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeWeek === undefined
                        ? 'bg-purple-500 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    All
                  </button>

                  {availableWeeks.map((week) => (
                    <button
                      key={week}
                      onClick={() => setActiveWeek(week)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeWeek === week
                          ? 'bg-purple-500 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      Week {week}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-8">
                <ProjectGrid weekFilter={activeWeek} />
              </div>
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
