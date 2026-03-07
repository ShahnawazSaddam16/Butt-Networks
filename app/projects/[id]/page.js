// app/projects/[id]/page.js
import Projects from "../../components/Projects";
import { projects } from "../../data/projects";

/**
 * Return params for every project so Next.js statically generates /projects/[id]
 * next-sitemap will pick these up when building the sitemap.
 */
export async function generateStaticParams() {
  // ensure IDs are strings
  return projects.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const id = await params;
  const project = projects.find((p) => String(p.id) === String(p.id));
  if (!project) {
    return {
      title: "Project not found — Butt Networks",
      description: "Project not found.",
    };
  }

  const title = project.title || `Project • ${project.id}`;
  const description =
    project.description?.slice(0, 160) ||
    project.summary ||
    "Case study by Butt Networks";

  const url = `https://buttnetworks.com/projects/${id}`;
  const images = project.image ? [project.image] : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
  };
}

export default async function ProjectCaseStudy({ params }) {
  const { id } = await params;
  const project = projects.find((p) => String(p.id) === String(id));

  if (!project) {
    return <div className="p-10 text-center">Project not found</div>;
  }

  return <Projects projects={[project]} limit="all" single />;
}