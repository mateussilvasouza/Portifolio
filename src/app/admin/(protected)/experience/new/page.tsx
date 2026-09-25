import { ExperienceForm } from '../ExperienceForm'
import { createExperience } from '../actions'

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl tracking-[-0.03em]">Nova experiência</h1>
      <ExperienceForm action={createExperience} />
    </div>
  )
}
