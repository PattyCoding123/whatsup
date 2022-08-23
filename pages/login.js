import { auth, provider } from '../firebase'

import Head from 'next/head'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'

const Login = () => {

  /* 
    The signin function will authenticate a Firebase client
    using the GoogleAuthProvide. If the authentication fails,
    an alert will be displayed.
  */
  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      alert("Error with signing in: " + error.message)
    }
  }

  /*
    The Login component will display the app Logo and
    the login button. The login button redirects the
    users to sign in with their Google account via a Popup.
  */
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="logo"/>
        {/* Button from Material UI */}
        <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
      </LoginContainer>
    </Container>
  )
}

export default Login

/*
  The Container is a div that will represent the page
  that the LoginContainer is a part of. 

  We want to make sure that the children items are displayed
  in a div, and we will position them in the center.

  The height will be 100% of the viewport, and the 
  background color will be whitesmoke.
*/
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`

/*
  The LoginContainer is a div that will 
  display the logo for the app and the login button.

  The children items will be flex items and will be in
  the column (vertical) direction. We want to align the
  items in the center of their row.

  We will have 100px padding all around the div such that
  the logo and button are not close to the div edges.
*/
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`

// Make the image only 200px in height and width.
// This will also help make the LoginContainer dimensions.
const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 50px;
`