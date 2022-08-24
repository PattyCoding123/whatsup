import styled from 'styled-components'
import { Avatar } from '@mui/material'
import { auth, db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'

const Chat = ({ id, recipientEmail }) => {
  // The following lines of code will return an array that contains all the 
  // documents in our users collection which match the recipientEmail.
  const recipientColRef = query(collection(db, "users"), where("email", "==", recipientEmail))
  const [recipientSnapshot] = useCollection(recipientColRef)
  const recipient = recipientSnapshot?.docs?.[0]?.data() // Get the document from the QuerySnapshot

  const router = useRouter()
  const enterChat = () => {
    router.push(`/chat/${id}`)

  }

  /*
    The Chat component will be a div that displays the profile
    image of the recipient as well as the email address.

    If the recipient does NOT have a profile picture, the first
    letter of their email address will be displayed instead.
  */
  return (
    <Container onClick={enterChat}>
      {recipient ? 
        <UserAvatar src={recipient?.photoURL} />
        :
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      }
      <p>{recipientEmail}</p>
    </Container>
  )
}
export default Chat

/*
  For the Chat Container, we will have the image and email
  address be flex itemns. They will be aligned in the center
  of the row.

  If the email address is long, we will break it to avoid
  overflowing out of the Sidebar.

  We will also give a hover effect by making the background
  grey out.

  We will also give some padding so the items aren't at 
  the border of the div.
*/
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`

