import React from 'react'
import { View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Colors } from 'react-native-ui-lib';
import Index from '../../Index';


interface  ProRNPickerSelectProps {

  data : {label : string, value : number}[];
  onValueChange : (value : string) => void;
  index : number;
}
const ProRNPickerSelect :React.FC<ProRNPickerSelectProps> =  (props) => {
  return (
   <>
   <RNPickerSelect  
   value={props.data[props.index].value}
           style={{
        inputIOS: {
            backgroundColor : "green",
          
          
          },
        inputAndroid: {
          backgroundColor : "silver",
          width: 195,
          color : "black",
          height: 68,
        },
      }}  items={props.data} onValueChange={props.onValueChange} />
   </>
  )
}

export default ProRNPickerSelect
