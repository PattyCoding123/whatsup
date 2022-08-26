import { ThreeDots } from 'react-loader-spinner'
import styled from 'styled-components'
import Image from 'next/image'

const Loading = () => {
  /*
    Loading dotsFor the Loading component, we will have a div that displays
    the logo and a loading indicator. The div items will be flex items,
    and they will be displayed in the column direction. We want to align
    the items in the center of the cross-axis, and we want to justify the 
    content so that they are at center.

    The ThreeDots component is what will display the loading indicator.
    The component comes from the react-loader-spinner library.
  */
  return (
    <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "100vh" }}>
      <Logo>
        <Image src="/logo.png" width="200px" height="200px" alt="logo" />
      </Logo>
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  )
}
export default Loading

// Logo is a span that will wrap around our Image component.
const Logo = styled.span`
  margin-bottom: 10px;
`