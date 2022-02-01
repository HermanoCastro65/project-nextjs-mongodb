import { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/client'

const IndexPage: NextPage = () => {
  const [session, loading] = useSession()

  return (
    <div>
      {!session && (
        <div className="text-3xl">
          Not signed in <br />
          <button onClick={(): Promise<void> => signIn()}>Sign in</button>
        </div>
      )}
      {session && (
        <div className="text-3xl">
          Signed in as {session.user.email} <br />
          <button onClick={(): Promise<void> => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  )
}

export default IndexPage
