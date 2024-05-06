import * as React from "react"
import Svg, { SvgProps, Path, Circle } from "react-native-svg"
const HomeIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      d="M256 0 11.088 260.496h57.28V512h375.264V260.496h57.28z"
      style={{
        fill: "#333",
      }}
    />
    <Path
      d="M193.439 260.943h122.723v16H193.439z"
      style={{
        fill: "#fff",
      }}
      transform="rotate(153.689 254.797 268.94)"
    />
    <Path
      d="M247.274 280.898h15.984v124.3h-15.984z"
      style={{
        fill: "#fff",
      }}
      transform="scale(-1) rotate(-63.32 -556.331 413.971)"
    />
    <Circle
      cx={185.744}
      cy={305.44}
      r={35.12}
      style={{
        fill: "#0ba4e0",
      }}
    />
    <Circle
      cx={326.256}
      cy={233.712}
      r={35.12}
      style={{
        fill: "#0ba4e0",
      }}
    />
    <Circle
      cx={325.92}
      cy={377.2}
      r={35.12}
      style={{
        fill: "#0ba4e0",
      }}
    />
  </Svg>
)
export default HomeIcon
