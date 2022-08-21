import { Avatar, IconButton } from '@material-ui/core'
import styled from "styled-components"
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const Sidebar = () => {
  /*
    The Sidebar is a component that displays a user interface
    with a list of users and a search bar to find other users.

    It takes up some of the left of the user's screen.
  */
  return (
    <Container>
      <Header>
        <UserAvatar />

        <IconsContainer>
          {/* 
            In the IconsContainerm surround the 
            ChatIcon and MoreVertIcon icons in a IconButton
            container to make them actual buttons.
          */}
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
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
const IconsContainer = styled.div`
`

