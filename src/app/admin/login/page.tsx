import { Button } from '@/components/ui/button'
import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="flex min-h-svh items-center justify-center px-6">
      <form
        action={login}
        className="w-full max-w-sm rounded-[20px] border bg-card p-7.5"
      >
        <h1 className="text-xl tracking-[-0.03em]">Admin</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Entre com a senha para gerenciar os posts.
        </p>

        <input
          type="password"
          name="password"
          placeholder="Senha"
          autoFocus
          required
          className="mt-6 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50"
        />

        {error && (
          <p className="mt-3 text-xs text-destructive">Senha incorreta.</p>
        )}

        <Button type="submit" className="mt-5 w-full" variant="primary">
          Entrar
        </Button>
      </form>
    </div>
  )
}
