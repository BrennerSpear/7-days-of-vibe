import Head from 'next/head'
import Link from 'next/link'
import { NavBar } from '~/components/nav-bar'
import NewsletterForm from '~/components/newsletter-form'
import { Button } from '~/components/ui/button'

export default function Home() {
  return (
    <>
      <Head>
        <title>7 Days of Vibe Coding</title>
        <meta
          name="description"
          content="Build 1 little app a day with AI tools. Vibe, don't code."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <NavBar />

        {/* Main Content */}
        <main className="flex-grow">
          {/* Hero Section */}
          <div className="pt-24 pb-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background">
            <div className="container px-4 mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                  Seven Days of Vibe Coding
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Build 1 little app a day. <br />
                  <br /> Bringing an idea to life has never been easier. No
                  coding is required to build an app or website. Taking an idea
                  to something that works is now measured in minutes, not days.
                </p>
                <div className="space-y-8">
                  {/* Event Dates */}
                  <h3 className="text-xl font-semibold mb-8 text-center text-purple-700 dark:text-purple-300">
                    March 17-23, 2025
                  </h3>

                  {/* Challenge Rules */}
                  <div className="max-w-2xl mx-auto bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">
                      Challenge Rules
                    </h3>
                    <ul className="space-y-3 text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-300 font-bold">
                          •
                        </span>
                        <span className="dark:text-gray-200">
                          1 project a day.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-300 font-bold">
                          •
                        </span>
                        <span className="dark:text-gray-200">
                          You can spend as little as 5 minutes on it, even just
                          1 good prompt can make something fun or useful!
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-300 font-bold">
                          •
                        </span>
                        <span className="dark:text-gray-200">
                          No manual coding. We&apos;re here to Vibe, not Code.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <a
                      href="https://warpcast.com/~/channel/vibes"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-lg font-medium text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-400 underline decoration-2 underline-offset-4"
                    >
                      Join the 7 Days of Vibe Farcaster Channel →
                    </a>
                  </div>

                  <div className="flex justify-center my-10">
                    <Link href="/submit" className="w-full max-w-md">
                      <Button className="w-full py-8 px-12 text-2xl font-extrabold bg-primary hover:bg-primary/90 shadow-2xl transition-all hover:scale-105 rounded-xl border-2 border-primary/30">
                        Submit Your Project
                      </Button>
                    </Link>
                  </div>

                  <NewsletterForm />
                </div>
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

// Disable SSR for the entire home page
Home.getInitialProps = () => {
  return { props: {} }
}
