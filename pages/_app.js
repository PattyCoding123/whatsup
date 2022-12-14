import { useAuthState } from 'react-firebase-hooks/auth'
import { serverTimestamp } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react';


import Login from './login';
import Loading from '../components/Loading'
import '../styles/globals.css'
import { auth, db } from '../firebase'

function MyApp({ Component, pageProps }) {

  // Get an instance of the user and loading state
  // using the react-firebase-hook
  const [user, loading] = useAuthState(auth)

  /*
    In the useEffect, we will have an async function
    that will store the user's email, lastSeen timestamp,
    and their photoURL into our database in Firestore.

    This will activate whenever the user logs in, and 
    we will merge the documents to update the lastSeen timestamp.
  */
  useEffect(() => {
    async function setUser() {
      if (user) {
        const docRef = doc(db, "users", user.uid)
        const data = {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        }
        const options = { merge: true }
        await setDoc(docRef, data, options)
      }
    }

    setUser()
  }, [user])

  // If the main page is loading, render the Loading component.
  if (loading) return <Loading />

  // If the user instance is null, render the login page.
  if (!user) return <Login />

  // If the user instance is not null, render the app.
  return <Component {...pageProps} />
}

export default MyApp
