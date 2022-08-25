import styled from 'styled-components'
import { AttachFile, MoreVert } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { useRouter } from 'next/router'

import { auth, db } from '../firebase'

const ChatScreen = ({ chat, messages}) => {
  const [user] = useAuthState(auth)
  const router = useRouter()

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
    messagesSnapshot. 

    It is responsible for providing the real-time information for the messages.
  */
  const showMessages = () => {
    if(messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => {
        {/* Create message component */}
        <Message 
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      })
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
        <EndOfMessage />
      </MessageContainer>
    </Container>
  )
}
export default ChatScreen

const Container = styled.div`
`

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

const MessageContainer = styled.div``

const EndOfMessage = styled.div``
