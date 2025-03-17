import Head from "next/head";
import Link from "next/link";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { ProjectGrid } from "~/components/project-grid";

export default function Showcase() {
  return (
    <>
      <Head>
        <title>Community Projects - 7 Days of Vibe Coding</title>
        <meta name="description" content="Check out projects built during the 7 Days of Vibe Coding challenge." />
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
              <div className="flex gap-8 items-center">
                <a
                  href="https://warpcast.com/~/channel/vibes"
                  target="_blank"
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  FC Channel
                </a>
                <Link
                  href="/submit"
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  Submit Project
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-24">
          <div className="container px-4 mx-auto py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                Community Projects
              </h1>
              
              <div className="grid gap-8">
                <ProjectGrid />
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
  );
}