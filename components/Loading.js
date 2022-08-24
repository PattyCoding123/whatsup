import { ThreeDots } from 'react-loader-spinner'

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
      <img 
        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
        alt="loading image"
        style={{ marginBottom: '10' }}
        height={200}
      />
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