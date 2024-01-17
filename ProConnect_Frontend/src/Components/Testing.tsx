import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ProButton from '../Components/Controls/ProButton'
import ProHeader, { HeaderType } from "../Components/Layout/ProHeader";
import { Colors, Text, View } from "react-native-ui-lib";
import {clearData} from "../Utility/Storage";
import { useDispatch, useSelector } from 'react-redux';
import { isDarkTheme, toggleTheme } from '../Services/Redux/PreferencesSlice';
import { AppDispatch } from '../Services/Store';
import ProRefreshControl from './Controls/ProRefreshControl';


const Testing: React.FC = () => {
  const darkTheme = useSelector(isDarkTheme);
  const dispatch = useDispatch<AppDispatch>();
  function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function delayedLoop() {
    await delay(1000);
    dispatch(toggleTheme());
  }
  
  return (
    // <SafeAreaView style={styles.container}>
      <View flex paddingB-page paddingH-page centerH>
        <View padding-page backgroundColor={Colors.backgroundPrimary}>
          <Text h3>
            {darkTheme ? "Dark Mode" : "Light Mode"}
          </Text>
        </View>
        <ProRefreshControl onRefreshAction={delayedLoop} children={(<View><ProHeader
            center
            text="Header Example S"
            headerType={HeaderType.H3}
            />
          <ProHeader text="Header Example N" headerType={HeaderType.H2} />
          <ProHeader text="Header Example L" headerType={HeaderType.H1} />
          <ProButton
            borderRadius={45}
            outlineWidth={1}
            outlineColor="black"
            text='Toggle Theme'
            onPress={() => {
              dispatch(toggleTheme());
            }}
            />
            <ProButton onPress={()=>{clearData()}} text='Clear Data'></ProButton>
          <Text h1>Hello World</Text>
          <Text t2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisi
            arcu, mattis fermentum placerat vel, maximus blandit lorem. Nulla id
            condimentum magna. In hac habitasse platea dictumst. Praesent ut
            odio laoreet, consequat nisi eu, consequat lacus. Aenean tristique
            diam sit amet porta rutrum. Ut gravida volutpat pretium. Suspendisse
            non lorem at tellus tincidunt eleifend. Cras rhoncus tellus vitae
            sem tincidunt, ac malesuada turpis vehicula. Pellentesque ac tortor
            ut purus facilisis rutrum at quis neque. Praesent faucibus venenatis
            metus ut fermentum. Aliquam erat volutpat.
          </Text> 
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisi
            arcu, mattis fermentum placerat vel, maximus blandit lorem. Nulla id
            condimentum magna. In hac habitasse platea dictumst. Praesent ut
            odio laoreet, consequat nisi eu, consequat lacus. Aenean tristique
            diam sit amet porta rutrum. Ut gravida volutpat pretium. Suspendisse
            non lorem at tellus tincidunt eleifend. Cras rhoncus tellus vitae
            sem tincidunt, ac malesuada turpis vehicula. Pellentesque ac tortor
            ut purus facilisis rutrum at quis neque. Praesent faucibus venenatis
            metus ut fermentum. Aliquam erat volutpat.
          </Text></View>)}></ProRefreshControl>
        <ScrollView>
          
        </ScrollView>
      </View>
// </SafeAreaView>
  )
}

export default Testing


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
  });