import { ExternalLink, Lock } from 'lucide-react'
import type { Project } from '@/data/projects'
import { GithubIcon } from '@/components/ui/icons'
import { StackChips } from '@/components/ui/stack-chips'
import { Tag } from '@/components/ui/tag'

export function ProjectCard({
  project,
}: {
  project: Project
}) {
  const links = project.links

  return (
    <article className="group relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-all duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1 hover:bg-background-2 hover:shadow-lift">
      {project.video && (
        <video
          src={project.video.src}
          title={project.video.title}
          aria-label={project.video.title}
          className="-mx-2 -mt-2 aspect-video w-[calc(100%+1rem)] rounded-md border border-border bg-background-2 object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
        />
      )}
      <div className="flex items-center justify-between gap-4">
        <Tag tone={project.kind}>
          {project.kind === 'company' ? 'Empresa' : 'Estudo'}
        </Tag>
        {project.period && (
          <span className="text-sm font-medium text-muted-foreground">
            {project.period}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-display text-[22px] leading-[1.2] font-semibold tracking-[-0.015em]">
          {project.title}
        </h3>
        {project.kind === 'company' && (project.company || project.role) && (
          <p className="mt-1 text-sm font-medium">
            {project.company && (
              <span className="text-sky">{project.company}</span>
            )}
            {project.company && project.role && ' · '}
            {project.role && (
              <span className="text-muted-foreground">{project.role}</span>
            )}
          </p>
        )}
      </div>

      <p className="text-[15px] leading-[1.6] text-muted-foreground">
        {project.description}
      </p>

      {project.stack.length > 0 && <StackChips items={project.stack} />}

      {project.metricValue && (
        <div className="flex items-baseline gap-2.5 rounded-[10px] bg-background px-3.5 py-3">
          <b className="font-display text-2xl font-bold tracking-[-0.02em]">
            {project.metricValue}
          </b>
          <span className="text-sm text-muted-foreground">
            {project.metricLabel}
          </span>
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-border pt-4">
        {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
            >
              {link.kind === 'github' ? (
                <GithubIcon className="size-3.5" />
              ) : (
                <ExternalLink className="size-3.5" />
              )}
              {link.label}
            </a>
          ))}
        {project.privateNote && (
          <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <Lock className="size-3.5" />
            {project.privateNote}
          </span>
        )}
      </div>
    </article>
  )
}
