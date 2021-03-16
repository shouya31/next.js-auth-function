import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/user/signin">
        SingIn
      </Link>
      <Link href="/user/signup">
        SingUp
      </Link>
    </div>
  )
}
