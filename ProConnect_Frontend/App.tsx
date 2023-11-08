import { StyleSheet, ScrollView, Platform } from "react-native";
import LoginScreen from "./src/Screens/LoginScreen";
import React from "react";
import Profile from "./src/Screens/Profile";
import ProButton from "./src/Components/Controls/ProButton";
import ProHeader, { HeaderType } from "./src/Components/Layout/ProHeader";
import { useGetUsers } from "./src/Hooks/Users/useGetUsers";
import { initTheme } from "./Style";
import { Text, View } from "react-native-ui-lib";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

initTheme();

export default function App() {
  const users = useGetUsers();
  return (
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView>
    <View flex bg-cyan50 paddingV-5 paddingH-10 centerH>

      <ScrollView>
        <ProHeader text="Header Example S" headerType={HeaderType.Small} />
        <ProHeader text="Header Example N" headerType={HeaderType.Normal} />
        <ProHeader text="Header Example L" headerType={HeaderType.Large} />
        <ProButton
          borderRadius={45}
          outlineWidth={1}
          outlineColor="black"
          onPress={() => {
            alert(users);
          }}
          />
        <Text h1>Hello World</Text>
        <Text body>
          Lorem   ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisi
          arcu, mattis fermentum placerat vel, maximus blandit lorem. Nulla id
          condimentum magna. In hac habitasse platea dictumst. Praesent ut odio
          laoreet, consequat nisi eu, consequat lacus. Aenean tristique diam sit
          amet porta rutrum. Ut gravida volutpat pretium. Suspendisse non lorem
          at tellus tincidunt eleifend. Cras rhoncus tellus vitae sem tincidunt,
          ac malesuada turpis vehicula. Pellentesque ac tortor ut purus
          facilisis rutrum at quis  neque. Praesent faucibus venenatis metus ut
          fermentum. Aliquam erat volutpat.
        </Text>
        <Text body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisi
          arcu, mattis fermentum placerat vel, maximus blandit lorem. Nulla id
          condimentum magna. In hac habitasse platea dictumst. Praesent ut odio
          laoreet, consequat nisi eu, consequat lacus. Aenean tristique diam sit
          amet porta rutrum. Ut gravida volutpat pretium. Suspendisse non lorem
          at tellus tincidunt eleifend. Cras rhoncus tellus vitae sem tincidunt,
          ac malesuada turpis vehicula. Pellentesque ac tortor ut purus
          facilisis rutrum at quis neque. Praesent faucibus venenatis metus ut
          fermentum. Aliquam erat volutpat.
        </Text>
      </ScrollView>
    </View>
    </SafeAreaView>

</SafeAreaProvider>
    // <Profile  name={''} job={''} experience={''} telephone={''} email={''} availibality={''} location={''} profileImg={''} about='In this modified code, Ive introduced an interface GalleryImageProps to define the expected props for the GalleryImage component. The source prop is used to dynamically set the image source, and the imageStyle prop is used to allow custom styling of the Image component.Now, when you use the GalleryImage component in your application, you can pass the desired values for the source and imageStyle props:'></Profile>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
});
