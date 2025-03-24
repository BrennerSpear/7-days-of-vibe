import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeToggle } from "~/components/ui/theme-toggle";

export function NavBar() {
  const router = useRouter();
  const currentPath = router.pathname;

  // Function to determine if a link is active
  const isActive = (path: string) => {
    return currentPath === path ? "text-purple-800 dark:text-purple-200 font-semibold" : 
      "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300";
  };

  return (
    <nav className="fixed top-0 right-0 left-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-50 border-b dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-lg text-purple-600 dark:text-purple-400 mr-4">
              7 Days of Vibe
            </Link>
          </div>
          <div className="flex gap-6 items-center">
            <a
              href="https://warpcast.com/~/channel/vibes"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              FC Channel
            </a>
            <Link
              href="/submit"
              className={`text-sm font-medium ${isActive("/submit")}`}
            >
              Submit Project
            </Link>
            <Link
              href="/showcase"
              className={`text-sm font-medium ${isActive("/showcase")}`}
            >
              Community Projects
            </Link>
            <Link
              href="/tools"
              className={`text-sm font-medium ${isActive("/tools")}`}
            >
              Vibe Tools
            </Link>
            <Link
              href="/prompts"
              className={`text-sm font-medium ${isActive("/prompts")}`}
            >
              Prompt Ideas
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}