import { notFound } from 'next/navigation'
import { getContactLinkById } from '@/db/queries'
import { ContactLinkForm } from '../../ContactLinkForm'
import { updateContactLink } from '../../actions'

export default async function EditContactLinkPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const link = await getContactLinkById(Number(id))

  if (!link) notFound()

  return (
    <div>
      <h1 className="mb-6 text-2xl tracking-[-0.03em]">Editar link de contato</h1>
      <ContactLinkForm
        action={updateContactLink.bind(null, link.id)}
        initialValues={{
          label: link.label,
          handle: link.handle,
          href: link.href,
          order: link.order,
        }}
      />
    </div>
  )
}
