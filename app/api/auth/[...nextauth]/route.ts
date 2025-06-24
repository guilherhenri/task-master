import NextAuth, { AuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

import { env } from '@/env'

const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
