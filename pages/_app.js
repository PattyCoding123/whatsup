import Login from './login';
import Loading from '../components/Loading'
import '../styles/globals.css'
import { auth, db } from '../firebase'

import { useAuthState } from 'react-firebase-hooks/auth'


function MyApp({ Component, pageProps }) {
  // Get an instance of the user and loading state
  // using the react-firebase-hook
  const [user, loading] = useAuthState(auth)

  // If the main page is loading, render the Loading component.
  if (loading) return <Loading />

  // If the user instance is null, render the login page.
  if (!user) return <Login />

  // If the user instance is not null, render the app.
  return <Component {...pageProps} />
}

export default MyApp
