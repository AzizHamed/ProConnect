import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const AirConditioningIcon = (props: SvgProps) => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M21 2.5H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-3 8H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2Zm0-4h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2ZM12.793 14.793l-2 2a1 1 0 0 0 0 1.414l.293.293-1.293 1.293a1 1 0 1 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414l-.293-.293 1.293-1.293a1 1 0 0 0-1.414-1.414ZM18.293 14.793l-2 2a1 1 0 0 0 0 1.414l.293.293-1.293 1.293a1 1 0 1 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414l-.293-.293 1.293-1.293a1 1 0 0 0-1.414-1.414ZM7.293 14.793l-2 2a1 1 0 0 0 0 1.414l.293.293-1.293 1.293a1 1 0 1 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414l-.293-.293 1.293-1.293a1 1 0 0 0-1.414-1.414Z" />
  </Svg>
)}
export default AirConditioningIcon
