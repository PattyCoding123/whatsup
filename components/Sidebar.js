import { Avatar, Button, IconButton }from '@mui/material'
import styled from "styled-components"
import { Chat, MoreVert } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import * as EmailValidator from 'email-validator'
import { collection, addDoc, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

import { auth, db } from '../firebase'
import ChatBar from './ChatBar'

const Sidebar = () => {
  /*
    The following lines of code will generate a snapshot of all the current chats
    for the logged in user using a Firestore query and the useCollection 
    react-firebase-hooks.

    The chatsSnapshot acts as an up-to-date collection of all the chat messages
    that are associated with the logged in user.
  */
  const [user] = useAuthState(auth)
  const userChatRef = query(collection(db, "chats"), where("users", "array-contains", user.email))
  const [chatsSnapshot] = useCollection(userChatRef)

  /*
    The following event handler will create a new chat
    document in our firestore database.

    First, we will prompt the user to enter an email address they
    wish to chat with. Then, if the address is valid, we will
    add a document to the database. The document is an array
    with the logged in user and the recipient.

    Since we are using the addDoc function, we need to create
    a collection reference.
  */
  const createChat = async () => {
    const input = prompt('Please enter an email address for the user you want to chat with.')

    if (!input) return null;
   
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      // We need to add the 1-on-1 chat into the DB 'chats' collection only if the
      // email is valid and the chat does not already exist.
      const collectionRef = collection(db, "chats")
      const data = { users: [user.email, input] }
      await addDoc(collectionRef, data)
    }
  }

  /*
    The following function will check to see if a 1-on-1 chat already exists.

    Using the chatsSnapshot (querySnapshot<DocumentData>) from our react-firebase-hooks,
    we will go through each 1-on-1 chat, and in each chat, will initiate another search
    to find a user that matches the recipientEmail. 

    The user === recipientEmail 'find' will return an array of length 1 that contains 
    the recipientEmail IF it exists, and then the 1-on-1 'find' chat will return 
    the first instance of the document which returned the array of length 1 (since we 
    needed to find a chat that returned an array of length > 0).
  */
  const chatAlreadyExists = (recipientEmail) => 
    !!chatsSnapshot?.docs
    .find((chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0)
  

  /*
    The Sidebar is a component that displays a user interface
    with a list of users and a search bar to find other users.

    It takes up some of the left of the user's screen.
  */
  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>

        <IconsContainer>
          {/* 
            In the IconsContainerm surround the 
            ChatIcon and MoreVertIcon icons in a IconButton
            container to make them actual buttons.
          */}
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
          <SearchIcon />
          <SearchInput placeholder="Search for users"/>
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* 
        List of user chats:
        For each user chat, we will render a small "ChatBar" component that
        displays the recipient email address and their profile picture.

        To do this, we will map through the document snapshot array we had to
        query from the database. Each entry in the snapshot is a "chat" between
        the currently loggeded in user and the recipient email address.
      */}
      {chatsSnapshot?.docs.map((chat) => (
        <ChatBar key={chat.id} id={chat.id} recipientEmail={chat.data().users[1]}/>
      ))}
    </Container>
  )
}


export default Sidebar

const Container = styled.div`
`

/*
  The header component of the sidebar will display
  the user's avatar and icons at the TOP of the Sidebar.

  The display will be flex, and we will make the position
  sticky so that it will always stay at the top of the
  Sidebar even if the width and height of the screen
  change.

  z-index should be 1 so that it is on top of everything else.
  
  justify-content as space-between and align-items in the center
  of the this div.

  We will give some padding around so that the icons aren't as close
  to the edges of the screen.
*/
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px; // Default height of 80px.
  border-bottom: 1px solid whitesmoke; // Subtle border.
`
/*
  The UserAvatar component is the user's avatar
  picture styled using the Material UI icon component.

  The cursor should be a pointer, and the avatar should
  blur a little bit when the user is hovering over it.
*/
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity:0.8;  
  }
`
/*
  The IconsContainer is a div which will display
  icons relating to chats and options in the sidebar
  component.
*/
const IconsContainer = styled.div``

/*
  The Search is a div which will display a search 
  icon and a search input field.

  We want to align the items in the center of the div
  and we will have the children be flex items.
*/
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
`

/*
  The SearchInput is a styled input that will have no borders
  and be a flex display of 1.
*/
const SearchInput = styled.input`
  border: none;
  flex: 1;
`

/*
  The SidebarButton is a button that will allow users
  to start a new chat. The width will be 100% of
  the Sidebar contianer, and  we will use the &&& to increase the 
  priority of the top and bottom borders.
*/
const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`
