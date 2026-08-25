import { notFound } from 'next/navigation'
import { getPostById } from '@/db/queries'
import { PostForm } from '../../PostForm'
import { updatePost } from '../../actions'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostById(Number(id))

  if (!post) notFound()

  return (
    <div>
      <h1 className="mb-6 text-2xl tracking-[-0.03em]">Editar post</h1>
      <PostForm
        action={updatePost.bind(null, post.id)}
        initialValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          tags: post.tags,
          readingTimeMinutes: post.readingTimeMinutes,
          featured: post.featured,
          publishedAt: post.publishedAt.toISOString().slice(0, 10),
        }}
      />
    </div>
  )
}
