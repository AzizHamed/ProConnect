import { TouchableOpacity, View,Text,StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";
import { Colors } from "react-native-ui-lib";
import SVGIconContainer from "./SVGIconContainer";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setPersonsPage } from "../../Services/Redux/Slices/PersonsPageSlice";

interface Item {
  label: string;
  value: string;
  component: React.FC
}


const renderItem = ({ item }: { item: Item }) => 
  {
    const navigation = useNavigation();

    const dispatch = useDispatch()
    return (
   

    
  <TouchableOpacity style={styles.pressable} onPress={()=>{
    dispatch(setPersonsPage({ComponentType : "Rating"}))
    navigation.navigate("PersonsPage")
  }}>
    
    <View style={styles.autoCompleteItemsStyle}>
      <View style={{height:"100%", justifyContent :"center"}}>
      <Text style={{color :"black"}}>{item?.label}</Text>
      </View>

      <View style={{height:"100%", justifyContent :"center"}}>
      <SVGIconContainer iconComponent={item.component} color={Colors.$backgroundDarkActive} width={40} height={40}/>

      {/* <SvgUri
      width="40"
      height="40"
      uri={item.uri}
      fill={Colors.$backgroundDarkActive}
    /> */}
      
      </View>
    </View>
  </TouchableOpacity>
  )};

export default renderItem

const styles = StyleSheet.create({ 
  pressable : {
    backgroundColor : "white",
    paddingRight : 10,
    justifyContent : "center",
    width:"100%",
  },

  autoCompleteItemsStyle: {
    backgroundColor : "white",
    height : 60,
    justifyContent : "space-between",
    borderColor:"black",
    borderBottomWidth :1,
    paddingLeft:10,
    flexDirection:"row",
    width : "100%"
  },

});

