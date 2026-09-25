import { ContactLinkForm } from '../ContactLinkForm'
import { createContactLink } from '../actions'

export default function NewContactLinkPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl tracking-[-0.03em]">Novo link de contato</h1>
      <ContactLinkForm action={createContactLink} />
    </div>
  )
}
