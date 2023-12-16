import React from 'react'
import { Text, TextProps } from 'react-native-ui-lib';
type ProHeaderProps = {
    text: string
    headerType?: HeaderType 
}
export enum HeaderType{
    H1, H2, H3, H4
}
const ProHeader: React.FC<ProHeaderProps & TextProps> = (props) => {
    const text = props.text || "Hello World!";
    const headerType = (props.headerType != undefined) ? props.headerType : HeaderType.H2;
    const h1 = isHeaderSize(headerType, HeaderType.H1);
    const h2 = isHeaderSize(headerType, HeaderType.H2);
    const h3 = isHeaderSize(headerType, HeaderType.H3);
    const h4 = isHeaderSize(headerType, HeaderType.H4);

  return (
    <Text {...props} allowFontScaling h1={h1} h2={h2} h3={h3} h4={h4} marginV-headers>{text}</Text>
  )
}

export default ProHeader

function isHeaderSize(headerType: HeaderType, checkedType: HeaderType)
{
    return headerType == checkedType;
}
