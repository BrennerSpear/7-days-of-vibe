import { Card, CardContent } from '~/components/ui/card'
import { api } from '~/utils/api'

interface ProjectGridProps {
  weekFilter?: number
}

export function ProjectGrid({ weekFilter }: ProjectGridProps) {
  const {
    data: projects,
    isLoading,
    error,
  } = api.project.getApproved.useQuery({ week: weekFilter })

  if (error) {
    return (
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border dark:border-gray-700">
        <p className="text-center text-lg text-red-600 dark:text-red-400">
          Error loading projects. Please try again later.
        </p>
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border dark:border-gray-700">
        {isLoading ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto" />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600 dark:text-gray-300">
            No projects have been submitted yet. <br />
            Be the first to share your creation!
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {isLoading
        ? Array(4)
            .fill(0)
            .map((_, i) => (
              <Card
                key={`skeleton-${i}`}
                className="bg-white/70 dark:bg-gray-800/70 overflow-hidden"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <CardContent className="p-5">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))
        : projects.map((project: ProjectCardProps['project']) => (
            <ProjectCard key={project.id} project={project} />
          ))}
    </div>
  )
}

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    link: string
    imageUrl: string
    farcasterUsername: string
    createdAt: Date | string
  }
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 overflow-hidden">
      <div className="h-48 overflow-hidden relative">
        {/* Using img element as it's part of a custom card component */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          onError={(e) => {
            // If image fails to load, replace with placeholder
            e.currentTarget.src =
              'https://placehold.co/600x400/9C6ADE/FFFFFF?text=Project+Image'
          }}
        />
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {(() => {
              try {
                const date = new Date(project.createdAt)
                if (isNaN(date.getTime())) return 'Date unavailable'
                const day = date.getDate()
                const suffix =
                  day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'
                return (
                  date.toLocaleDateString('en-US', { month: 'long' }) +
                  ' ' +
                  day +
                  suffix
                )
              } catch (e) {
                return 'Date unavailable'
              }
            })()}
          </div>
        </div>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
          {project.description}
        </p>
        <div className="flex justify-between items-center">
          {project.farcasterUsername ? (
            <a
              href={`https://warpcast.com/${project.farcasterUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              @{project.farcasterUsername}
            </a>
          ) : (
            <span className="text-sm text-gray-500">Anonymous</span>
          )}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md text-sm font-medium"
          >
            View Project
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
