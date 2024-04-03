import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, Text } from 'react-native-ui-lib'
import SVGIconContainer from './SVGIconContainer';

interface RenderPopularProfessionsProps {
  profession: string;
  number: number;
  component: React.FC
}

const renderPopularProfessions = ({ item }: { item: RenderPopularProfessionsProps }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainerStyle}>
        <SVGIconContainer iconComponent={item.component} color={Colors.textPrimary} width={80} height={80}/>
        <Text> {item.profession}</Text>
      </View>
      <View style={{ height: 50, alignItems: "center", justifyContent: "center" }}>
        <View>
          <Text style={{ fontSize: 20, color: Colors.backgroundPrimary }}>{item.number} Users</Text>
        </View>
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
    backgroundColor: Colors.$backgroundDark
  },
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 250,
    width: 250,
  }

})