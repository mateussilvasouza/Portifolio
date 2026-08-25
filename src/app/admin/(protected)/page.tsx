import Link from 'next/link'
import { getAllPosts } from '@/db/queries'
import { Button } from '@/components/ui/button'
import { deletePost } from './posts/actions'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const allPosts = await getAllPosts()

  return (
    <div>
      <h1 className="text-2xl tracking-[-0.03em]">Posts</h1>

      <div className="mt-6 divide-y rounded-[14px] border">
        {allPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium">{post.title}</span>
                {post.featured && (
                  <span className="shrink-0 rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent uppercase">
                    destaque
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {post.category} · {post.slug} ·{' '}
                {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/posts/${post.id}/edit`}>Editar</Link>
              </Button>
              <form action={deletePost.bind(null, post.id)}>
                <Button variant="outline" size="sm" type="submit">
                  Apagar
                </Button>
              </form>
            </div>
          </div>
        ))}

        {allPosts.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">
            Nenhum post ainda.
          </p>
        )}
      </div>
    </div>
  )
}
