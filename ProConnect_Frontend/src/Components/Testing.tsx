import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ProButton from '../Components/Controls/ProButton'
import ProHeader, { HeaderType } from "../Components/Layout/ProHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Text, View } from "react-native-ui-lib";
import {clearData} from "../Utility/Storage";
type TestingProps = {
    toggleTheme: () => void
}

const Testing: React.FC<TestingProps> = (props: TestingProps) => {
    const toggleTheme = props.toggleTheme;

  return (
    <SafeAreaView style={styles.container}>
      <View flex padding-page centerH backgroundColor={Colors.screenBG}>
        <ScrollView>
          <ProHeader
            center
            text="Header Example S"
            headerType={HeaderType.Small}
            />
          <ProHeader text="Header Example N" headerType={HeaderType.Normal} />
          <ProHeader text="Header Example L" headerType={HeaderType.Large} />
          <ProButton
            borderRadius={45}
            outlineWidth={1}
            outlineColor="black"
            text='Toggle Theme'
            onPress={() => {
              toggleTheme();
              // setDarkTheme(!darkTheme);
            }}
            />
            <ProButton onPress={()=>{clearData()}} text='Clear Data'></ProButton>
          <Text textPrimary h1>Hello World</Text>
          <Text textPrimary body>
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
          <Text textPrimary body>
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
        </ScrollView>
      </View>
</SafeAreaView>
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