import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { getSelectedLatitude, getSelectedLongitude } from "../../Services/Redux/Slices/FullScreenMapSlice";

const FullMapScreen = () => {
  

  const latitude = useSelector(getSelectedLatitude)
  const longitude = useSelector(getSelectedLongitude)

  return (
    <View>
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};


export default FullMapScreen;