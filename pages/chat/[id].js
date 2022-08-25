import styled from 'styled-components'
import Head from 'next/head'
import { collection, doc, query, orderBy, getDoc, getDocs } from 'firebase/firestore'

import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { db } from '../../firebase'

const Chat = ({ chat, messages}) => {
  /*
    The [id] page will be rendered when the user clicks a ChatBar
    to initiate a 1-on-1 chat. It will render the Sidebar in a addition
    to a chat container that will display both the messages and other
    information regarding the recipient.

    The page takes advantage of server-side props. We will inject 
    the chat docs data regarding the specific 1-on-1 chat as well
    as the messages from the subcollection into the ChatScreen 
    component. This is important for pre-rendering the page
    such that the user does not need to wait for the messages
    to be fetched before rendering onto the screen.
  */
  return (
    <Container>
      <Head>
        <title>Chat with {chat.users[1]}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages}/>
      </ChatContainer>
    </Container>
  )
}
export default Chat

/*
  The following function is a Server-side function that is responsible for
  loading the chat data from the database. It is called once the user clicks
  on a chat component.
*/
export async function getServerSideProps(context) {
  // Access the messages subcollection from our specific chat by 
  // creating a collection reference.
  const ref = collection(db, "chats", context.query.id, "messages")

  // Prep the messages on the server by making a query to all the documents
  // in the messages subcollection. Order by the most recent message.
  const messagesQuery = query(ref, orderBy("timestamp"))

  // Get a QuerySnapshot of all the messages.
  const messagesDocs = await getDocs(messagesQuery)

  /* 
    Now that we have the query snapshot, we will go through each 
    document in the snapshot and create an object that contains
    the documnent id and the data. 

    Then, once the docs are simplified, we will then map through
    document array again and create another object with all the data
    from the previous object but then add in a timestamp.
  */
  const userMessages = messagesDocs.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })).map((messages) => ({
    ...messages,
    timestamp: messages.timestamp.toDate().getTime(),
  }))


  /*
    We will prepare the "chat" data by calling the getDoc method on the 
    document reference. The correct document is specified by the id 
    of the page.

    Then, we will convert the data of the document into an object
    with the id and the data.

    A chat has the following properties: users
  */
  const chatRes = await getDoc(doc(collection(db, "chats"), context.query.id))
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  }

  // Return the chat data and messages data as props
  return {
    props: {
      messages: JSON.stringify(userMessages),
      chat: chat,
    }
  }
}

const Container = styled.div`
  display: flex;
`

/*
  The ChatContainer holds the ChatScreen which displays the messages
  between the users.

  The Chat Container will have a flex of 1 
*/
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* Edge */
  scrollbar-width: none; /* Firefox */
`
