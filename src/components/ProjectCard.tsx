import { ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative min-h-[335px] overflow-hidden rounded-[20px] border bg-gradient-to-br from-[rgba(17,23,34,.95)] to-[rgba(10,14,22,.88)] p-[29px] after:absolute after:right-[-90px] after:bottom-[-90px] after:h-[190px] after:w-[190px] after:rounded-full after:bg-accent/[0.06] after:blur-[2px] after:content-[''] max-sm:min-h-0">
      <small className="text-[9px] font-black tracking-[0.14em] text-accent">
        {project.category}
      </small>
      <h3 className="my-2.5 text-2xl tracking-[-0.045em]">{project.title}</h3>
      <p className="max-w-[510px] text-[13px] text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-[7px] border bg-white/2.5 px-2 py-1.5 text-[9px] text-[#c6cedb]"
          >
            {tech}
          </span>
        ))}
      </div>

      <span className="mt-5 inline-block rounded-lg bg-white/5 px-2.25 py-1.75 text-[11px] font-extrabold text-[#e8edf5]">
        {project.result}
      </span>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-extrabold text-accent"
        >
          <ExternalLink className="size-3.5" />
          Ver repositório
        </a>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-extrabold text-foreground/90"
          >
            <ExternalLink className="size-3.5" />
            Ver online
          </a>
        )}
      </div>
    </article>
  )
}
