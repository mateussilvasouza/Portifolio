import { PostForm } from '../PostForm'
import { createPost } from '../actions'

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl tracking-[-0.03em]">Novo post</h1>
      <PostForm action={createPost} />
    </div>
  )
}
