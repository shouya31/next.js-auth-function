import styles from '../styles/Home.module.css'
import Link from "next/link";
import { useUser } from "../hooks/userContext"

export default function Home() {
  const { signout } = useUser();

  return (
    <div className={styles.container}>
      <Link href="/user/signin">
        SingIn
      </Link>
      <Link href="/user/signup">
        SingUp
      </Link>
      <button　onClick={ signout } >ログアウト</button>
    </div>
  )
}
