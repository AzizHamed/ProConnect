import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import GalleryImage from './GalleryImage';
import getColors from '../../Constants/Colors';
interface GalleryAbriefProps {
  about:string;
  urls : string[];
}
const GalleryAbrief: React.FC<GalleryAbriefProps> = (props) =>{
  const about = props.about;
  const urls = props.urls;
  return (
    <View style={styles.container}>

      <View style={styles.paragraph}>
        <Text  style={styles.title}>
          About John
        </Text>

        <Text>
         {about}
        </Text>
      </View>

      <View style={styles.gallery}>
        <Text style={styles.title}>
          Gallery
        </Text>
        <View style={styles.scrollVW}> 


        </View>
      
        
      
        

        
      </View>
    </View>
  );
}

export default GalleryAbrief

 

const styles = StyleSheet.create({

  title:{
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    flexDirection:'row',
    //backgroundColor:'yellow'
  },

  imagesContainer:{
    flexDirection:'row',
    width:525,
    justifyContent:'space-between',
  },

  paragraph:{
    flex:1,
    flexDirection:"column"
  },

  gallery:{
    flex:1,
    marginLeft:10,
    //backgroundColor:'green'
  },

  scrollVW:{
    height:100,
    width:500,
    
  },
});
