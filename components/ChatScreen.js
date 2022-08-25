import styled from 'styled-components'
import { AttachFile, InsertEmoticon, Mic, MoreVert } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query, serverTimestamp, addDoc, setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { auth, db } from '../firebase'
import Message from './Message'


const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth)
  const [input, setInput] = useState({message: ""})
  const router = useRouter()

  const onChange = (event) => {
    const { name, value } = event.target

    setInput(prevInput => ({
      ...prevInput,
      [name]: value,
    }))
  }

  const sendMessage = async (event) => {
    event.preventDefault()

    // Update last seen of logged-in user to most recent timestamp
    const userRef = doc(db, "users", user.uid)
    const userData = {
      lastSeen: serverTimestamp(),
    }
    const options = { merge: true }
    await setDoc(userRef, userData, options)

    // Update chat using the router id.
    const chatRef = collection(db, "chats", router.query.id, "messages")
    const messageData = {
      timestamp: serverTimestamp(),
      message: input.message,
      user: user.email,
      photoURL: user.photoURL,
    }
    await addDoc(chatRef, messageData, options)

    // Reset form fields.
    setInput({message: ""})
  }

  /*
    The following code will create a query for the messages that are under
    the current router.query.id (a specific 1-on-1 conversation). 

    We will then get a query snapshot of all the messages 
    from the useCollection hook.
  */
  const messagesRef = query(collection(db, "chats", router.query.id, "messages"), orderBy("timestamp"))
  const [messagesSnapshot] = useCollection(messagesRef)

  /*
    ShowMessages will return Message components by mapping over each document in the
    messagesSnapshot. A message doc contains the recipient user, the message,
    and the timestamp.

    It is responsible for providing the real-time information for the messages.
  */
  const showMessages = () => {
    if(messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        // Show the messages
        <Message 
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      ))
    } else {
      // Return the server-side messages.
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  /*
    The ChatScreen component is responsible for rendering the messages
    and other additional information such as the recipient's avatar and
    the last time they were online.

    The ChatScreen componet will take advantage of both server-side rendering
    and client-side rendering.

    The ChatScreen will first render the server-side props that were passed by
    the [id] page, and then the client-side rendering comes into play
    when the user chats with their recipient as there will be real-time 
    snapshots.
  */
  return (
    <Container>
      <Header>
        <Avatar/>

        <HeaderInformation>
          <h3>Recipient Email</h3>
          <p>Last seen ...</p>
        </HeaderInformation>

        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticon />
        <Input
          value={input.message}
          name="message"
          onChange={onChange}
        />
        <button 
          hidden 
          disabled={!input.message} 
          type="submit" 
          onClick={sendMessage}
        >
          Send Message
        </button>
        <Mic />
      </InputContainer>
    </Container>
  )
}
export default ChatScreen

const Container = styled.div`
`
/*
  For the Header of the ChatScreen, we will make the position
  sticky to make the elements stay at the top of the Container div.

  We also want the items to be displayed as flex items, and we will align
  them in the center. They should remain in the row direction.

  The height should only be about 80px since the MessageContainer should
  take up the majority of the ChatScreen container.
*/
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`

/*
  For the HeaderInformation, we will have a margin-left of 15px so that the 
  Avatar is not extremely close to the email and lastSeen.
  
  Additionally, we will have the flex value as 1. This will make the 
  attachments and MoreVert icon move to the right of the Header div.
*/
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  h3 {
    margin-bottom: 3px;
  }
  
  p {
    font-size: 14px;
    color: gray;
  }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`

const EndOfMessage = styled.div``

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`

const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 20px;
  margin: 0px 15px;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
  outline: 0;
  border: none;
  border-radius: 10px;
`