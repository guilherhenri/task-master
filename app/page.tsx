import { GithubAuth } from '@/components/shared/github-auth'

import styles from './page.module.css'

export default function SignIn() {
  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <h1 className={styles.title}>Welcome to Task Master!</h1>

        <div className={styles.form}>
          <GithubAuth />
        </div>
      </main>
    </div>
  )
}
