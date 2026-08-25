import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.m4v', '.ogg']

function isVideoUrl(src: string) {
  const path = src.split('?')[0].toLowerCase()
  return VIDEO_EXTENSIONS.some((ext) => path.endsWith(ext))
}

const components: Components = {
  img({ src, alt }) {
    if (typeof src !== 'string') return null

    if (isVideoUrl(src)) {
      return <video src={src} controls className="w-full rounded-lg" />
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element -- markdown-authored content with unknown/arbitrary dimensions, next/image needs both upfront
      <img src={src} alt={alt ?? ''} className="w-full rounded-lg" />
    )
  },
}

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
