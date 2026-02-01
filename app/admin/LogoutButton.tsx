'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleLogout() {
    startTransition(async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/login')
        router.refresh()
      } catch (error) {
        console.error('Logout error:', error)
      }
    })
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <LogOut className="w-5 h-5" />
      <span className="font-medium">
        {isPending ? 'Déconnexion...' : 'Logout'}
      </span>
    </button>
  )
}

