import Head from "next/head";
import Link from "next/link";
import { NavBar } from "~/components/nav-bar";
import { ProjectGrid } from "~/components/project-grid";

export default function Showcase() {
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
