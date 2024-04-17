import { View } from "react-native"
import MapView, { Marker } from "react-native-maps"
import ProButton from "../../Components/Controls/ProButton"
import { IMessage } from "react-native-gifted-chat"


interface LocationModalProps {
  latitude : number,
  longitude : number,
  onSendLocation : (t : IMessage[]) => void,
  setVisible :(t: boolean) =>  void,
  convertLocationToMessage : (latitude : number, longitude : number) => IMessage

}
const LocationModal : React.FC<LocationModalProps>  = (props) => {


  const latitude = props.latitude

  const longitude = props.longitude

  console.log("latitude",latitude)
  console.log("longitude",longitude)
  return ( 
  
    <View style={{  backgroundColor : "silver", top : 60, height : "100%", alignItems : "center", padding : 10}}>
    <MapView
      style={{ width: "100%", height: "60%" }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={{ latitude, longitude }} />
    </MapView>

    <ProButton text={"Send Location"} onPress={()=>{
      props.onSendLocation([props.convertLocationToMessage(latitude,longitude)])
      props.setVisible(false)
    }}/>

    <ProButton text={"Cancel"} onPress={()=> props.setVisible(false)}/>
  </View>
  )
}

export default LocationModal