import { getSetting } from '@/db/queries'
import { CvUploadForm } from './CvUploadForm'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const cvUrl = await getSetting('cv_url')

  return (
    <div>
      <h1 className="text-2xl tracking-[-0.03em]">Configurações</h1>

      <div className="mt-6">
        <CvUploadForm currentUrl={cvUrl} />
      </div>
    </div>
  )
}
