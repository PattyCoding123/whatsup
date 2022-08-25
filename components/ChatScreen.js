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
  const [input, setInput] = useState({message: ""}) // Control form data using state
  const router = useRouter()

  /* 
    On the event where the user enters some text 
    into the input field, we will make sure to update the input.
  */
  const onChange = (event) => {
    const { name, value } = event.target

    setInput(prevInput => ({
      ...prevInput,
      [name]: value,
    }))
  }

  /*
    Send message will activate when the user hits enter for their message.

    The first step of the function is to update the logged in user's timestamp
    to display that they have been active recently.
    
    The second step is to update the chat history of the 1-on-1 chat.
    To do so, we will access the "messages" subcollection of the chat
    and add a new document with the message datas.

    Finally, we will reset the input form state.
  */
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
        // Show the messages from the messagesSnapshot by passing 
        // data from the docs into a Message component.
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
      // If the messagesSnapshot is still undefined, we will use the server-side
      // rendered messages to avoid having to wait for messages to appear.
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
        {/* 
          The button will submit the message via the sendMessage method.
          It will be hidden by default, and it will be disabled if 
          the input field is empty.
        */}
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

const Container = styled.div``
/*
  For the Header of the ChatScreen, we will make the position
  sticky and top as 0 to make the elements stay at the top 
  of the Container div.

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

/*
  The messages container is where all the Message components 
  will be rendered. We want some padding to ensure that
  the messages do not appear to close to the Header or 
  InputContainer.

  Also, we will make the minimum height 90% of the viewport height.
*/
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`

const EndOfMessage = styled.div``

/*
  The InputContainer is where the input field will be rendered along
  with some icons. We want the items inside the form to be flex items,
  and we will align them in the center.

  There will be some padding so that the input field and the icons
  are not directly next to the edges of the form.

  Also, we want the input container to stick to the bottom of the Container
  div, so we will set the position to sticky and have bottom as 0.
*/
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`

/*
  For the Input field itself, we will make the flex value equal to 1
  and we will set its align-items to be centered.

  Additionally, we will have some padding so that the user's message
  is not next to edges of the field.

  We want the position to be sticky and bottom as 0 to remain at the
  bottom of the InputContainer.

  We want a noticable background color but no border while the
  user is typing.
*/
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