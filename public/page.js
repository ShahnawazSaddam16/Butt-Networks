"use client";
import { projects } from "../app/data/projects";
import Projects from "../app/components/Projects";
import { useParams } from "next/navigation";

export default function ProjectCaseStudy() {
  const params = useParams();
  const { id } = params;
  const project = projects.find((p) => p.id === id);

  if (!project)
    return <div className="p-10 text-center">Project not found</div>;

  return <Projects projects={[project]} limit="all" single />;
}
