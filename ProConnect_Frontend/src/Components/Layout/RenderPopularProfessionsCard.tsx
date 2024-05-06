import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors, Text, View } from 'react-native-ui-lib'
import SVGIconContainer from './SVGIconContainer';

interface RenderPopularProfessionsProps {
  profession: string;
  number: number;
  component: React.FC
}

const renderPopularProfessions = ({ item }: { item: RenderPopularProfessionsProps }) => {
  return (
    <View style={styles.container}> 
      <View style={styles.cardContainerStyle} backgroundColor={Colors.backgroundDark}>
        <SVGIconContainer iconComponent={item.component} color={Colors.white} width={100} height={100}/>
        <Text marginT-20 color={Colors.white}> {item.profession}</Text>
      </View>
      <View style={{ height: 50, alignItems: "center", justifyContent: "center", backgroundColor: Colors.transparent }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.backgroundDark  }}>{item.number} Users</Text>
      </View>
    </View>
  )
}




export default renderPopularProfessions

const styles = StyleSheet.create({

  cardContainerStyle: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 250,
    width: 250,
  }

})