import React from 'react'
import { Text, TextProps } from 'react-native-ui-lib';
type ProHeaderProps = {
    text: string
    headerType: HeaderType
}
export enum HeaderType{
    Small, Normal, Large
}
const ProHeader: React.FC<ProHeaderProps & TextProps> = (props) => {
    const text = props.text || "Hello World!";
    const small = isHeaderSize(props.headerType, HeaderType.Small);
    const normal = isHeaderSize(props.headerType, HeaderType.Normal);
    const large = isHeaderSize(props.headerType, HeaderType.Large);
  return (
    <Text {...props} text60L={small} text40L={normal} text20L={large}>{text}</Text>
  )
}

export default ProHeader

function isHeaderSize(headerType: HeaderType, checkedType: HeaderType)
{
    return headerType == checkedType;
}
