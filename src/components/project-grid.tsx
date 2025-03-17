import { api } from "~/utils/api";
import { Card, CardContent } from "~/components/ui/card";

export function ProjectGrid() {
  const { data: projects, isLoading, error } = api.project.getApproved.useQuery();

  if (isLoading) {
    return (
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border dark:border-gray-700">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 dark:border-purple-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border dark:border-gray-700">
        <p className="text-center text-lg text-red-600 dark:text-red-400">
          Error loading projects. Please try again later.
        </p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border dark:border-gray-700">
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          No projects have been submitted yet. <br />
          Be the first to share your creation!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project: any) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    link: string;
    imageUrl: string;
    farcasterUsername: string;
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="bg-white/70 dark:bg-gray-800/70 overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
          {project.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-purple-600 dark:text-purple-400">
            @{project.farcasterUsername}
          </span>
          <a
            href={`https://warpcast.com/${project.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md text-sm font-medium"
          >
            View Project
          </a>
        </div>
      </CardContent>
    </Card>
  );
}