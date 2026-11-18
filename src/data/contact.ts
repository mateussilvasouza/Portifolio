import { getChannelConfig } from '@/lib/youtube'

/**
 * Mostrar o telefone (WhatsApp) no site. Fica público para qualquer visitante;
 * mude para `false` para esconder e deixar só email, LinkedIn, GitHub e YouTube.
 */
export const SHOW_PHONE = true

export const phone = {
  display: '(21) 96854-0168',
  whatsapp: 'https://wa.me/5521968540168',
}

export interface ContactLink {
  label: string
  handle: string
  href: string
}

/** Links de contato, na ordem do hero e da seção Contato. */
export function getContactLinks(): ContactLink[] {
  const youtube = getChannelConfig().url
  const links: (ContactLink | false)[] = [
    { label: 'Email', handle: 'mathheussilvasouza@gmail.com', href: 'mailto:mathheussilvasouza@gmail.com' },
    SHOW_PHONE && { label: 'WhatsApp', handle: phone.display, href: phone.whatsapp },
    { label: 'LinkedIn', handle: '/in/mateussilvasouza', href: 'https://linkedin.com/in/mateussilvasouza' },
    { label: 'GitHub', handle: '@mateussilvasouza', href: 'https://github.com/mateussilvasouza' },
    // O YouTube só aparece quando YOUTUBE_CHANNEL_URL estiver configurada.
    !!youtube && { label: 'YouTube', handle: youtube.replace(/^https?:\/\/(www\.)?youtube\.com\//, ''), href: youtube },
  ]
  return links.filter((link): link is ContactLink => Boolean(link))
}
