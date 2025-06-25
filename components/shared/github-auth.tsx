'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { ArrowClockwise } from 'phosphor-react'
import { useState } from 'react'

import styles from './github-auth.module.css'

export function GithubAuth() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)

    try {
      await signIn('github', {
        callbackUrl: '/dashboard',
        redirect: true,
      })
    } catch (error) {
      console.error('Erro durante o login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut({
        callbackUrl: '/',
        redirect: true,
      })
    } catch (error) {
      console.error('Erro durante o logout:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <ArrowClockwise className={styles.spin} size={32} />
      </div>
    )
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img
            src={session.user.image || '/default-avatar.png'}
            alt={`Avatar de ${session.user.name}`}
            className="h-8 w-8 rounded-full"
          />
          <span className="text-sm font-medium">Olá, {session.user.name}</span>
        </div>

        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700
            disabled:opacity-50"
        >
          {isLoading ? 'Saindo...' : 'Sair'}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={styles.signIn}
    >
      {isLoading ? (
        <ArrowClockwise className={styles.spin} size={20} />
      ) : (
        <>
          <svg className={styles.svg} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
          Sign in with Github
        </>
      )}
    </button>
  )
}
