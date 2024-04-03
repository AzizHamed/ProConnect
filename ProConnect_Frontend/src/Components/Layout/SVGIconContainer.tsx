import { View } from 'react-native'
import React from 'react'
import { Colors } from 'react-native-ui-lib';
import { SvgProps } from 'react-native-svg';

interface SVGIconProps {
    color?: string;
    width?: number;
    height?: number;
    svgProps?: SvgProps;
    iconComponent: React.FC<SvgProps>
  }


const SVGIconContainer: React.FC<SVGIconProps> = (props) => {
  const width = props.height || 80;
  const height = props.height || 80;
  const fill = props.color || Colors.textPrimary;

  return (
    <View>
      <props.iconComponent width={width} height={height} fill={fill} {...props.svgProps}/>
    </View>
  )
}

export default SVGIconContainer