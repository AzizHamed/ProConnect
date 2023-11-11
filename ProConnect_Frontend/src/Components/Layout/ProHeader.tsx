import React from 'react'
import { Text, TextProps } from 'react-native-ui-lib';
type ProHeaderProps = {
    text: string
    headerType?: HeaderType 
    color?: string
}
export enum HeaderType{
    Small, Normal, Large
}
const ProHeader: React.FC<ProHeaderProps & TextProps> = (props) => {
    const text = props.text || "Hello World!";
    const headerType = (props.headerType != undefined) ? props.headerType : HeaderType.Normal;
    const small = isHeaderSize(headerType, HeaderType.Small);
    const normal = isHeaderSize(headerType, HeaderType.Normal);
    const large = isHeaderSize(headerType, HeaderType.Large);
  return (
    //<Text {...props} text60L={small} text40L={normal} text20L={large} h1 primary>{text}</Text>
    <Text {...props} textPrimary allowFontScaling h1={large} h2={normal} h3={small} marginV-headers>{text}</Text>
  )
}

export default ProHeader

function isHeaderSize(headerType: HeaderType, checkedType: HeaderType)
{
    return headerType == checkedType;
}
