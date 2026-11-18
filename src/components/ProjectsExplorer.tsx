'use client'

import { useMemo, useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectTabs } from '@/components/ProjectTabs'

import type { Project } from '@/data/projects'

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<'all' | 'company' | 'study'>('all')

  const tabs = useMemo(
    () => [
      { id: 'all' as const, label: 'Todos', count: projects.length },
      {
        id: 'company' as const,
        label: 'Empresas',
        count: projects.filter((p) => p.kind === 'company').length,
      },
      {
        id: 'study' as const,
        label: 'Estudo',
        count: projects.filter((p) => p.kind === 'study').length,
      },
    ],
    [projects]
  )

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.kind === filter)

  return (
    <div>
      <div className="mb-6">
        <ProjectTabs
          tabs={tabs}
          value={filter}
          onChange={(id) => setFilter(id as typeof filter)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  )
}
