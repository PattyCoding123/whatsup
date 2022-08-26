import { useAuthState } from 'react-firebase-hooks/auth'
import moment from 'moment'
import styled from 'styled-components'

import { auth } from '../firebase'
const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth)

  /*
    We will assign the type of styling for the message depending 
    if the message is from the currently logged in user (Sender)
    or from the recipient (Receiver).
  */
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <TimeStamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : "..."}
        </TimeStamp>
      </TypeOfMessage>
    </Container>
  )
}
export default Message

const Container = styled.div``


/*
  The MessageElement is the standard styling for a message
  between the two users. It will have a width of fit-content
  so it is just wide enough for the message.

  There will be some padding, a border radius, and a margin
  to have a more rounded <p> element and to avoid having the 
  text appear to close to edges of the <p> element.

  We will make the min width at least 60px and we will
  position the messages relative to the MessageContainer div,
  which be default will be on the left.
*/
const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`

/* 
  Sender is a styled MessageElement.

  For sender messages, have a green background color
  and push the <p> tag to the left of the MessageContainer using 
  margin-left: auto.
*/
const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`

/*
  Receiver is a styled MessageElement.

  For receiver messages, we will align the text message
  to the left since they will stay to the left of the MessageContainer.
  We will also make the background color whitesmoke.
*/
const Receiver = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`

/*
  The TimeStamp component is a span that will display small text regarding
  the time that the message was sent. 
  
  The text color will be gray and the font size about 9px.

  There will be some padding such that the text doesn't interfere with
  the message.

  We will also make the position absolute so that it is relative to
  the MessageElement, and we will make it such that it is placed
  at the bottom right of the MessageElement by having the 
  bottom and right as 0.
*/
const TimeStamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`
