import React, { useState } from 'react'
import BackgroundView from '../../Components/Layout/BackgroundView'
import { View,Text,StyleSheet, Pressable, FlatList, Image, Linking, TouchableOpacity } from 'react-native'
import DesignedDropDown from '../DesignedDropDown'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MyTextInput from '../../Components/Controls/MyTextInput'
import AutocompleteInput from 'react-native-autocomplete-input'
import { getItemLabel } from 'react-native-ui-lib/src/components/picker/PickerPresenter'
import { articles, dataProfessions2, popularProfessions } from '../../Constants/Values';
import Svg, { Path, SvgUri } from 'react-native-svg';
import {  Colors } from 'react-native-ui-lib';
import { useGetAllUsersNumberQuery } from '../../Services/Redux/Api';
import Carousel from 'react-native-snap-carousel';
import ProButton from '../../Components/Controls/ProButton';
import { ScrollView } from 'react-native-gesture-handler';
import renderProfession from './ProfessionAutoComplete';
import renderPopularProfessions from './RenderPopularProfessionsCard';
import { AirbnbRating } from 'react-native-ratings';
import Swiper from 'react-native-swiper';

interface Item {
  label: string;
  value: string;
  uri : string;
}

interface article {
  title : string
  description : string;
  date : string;
  ref : string;
  imageuri : string;
  author : string;
}



const HomePage = () => {
  
  const [Value, setValue] = useState("Search")
  const [focus, setfocus] = useState(false)
  const [Query, setQuery] = useState("")
 const [dataProfessionals, setdataProfessionals] = useState([{}])
 const { data, isSuccess, isError, error, refetch } = useGetAllUsersNumberQuery();



 

 const findData = (query : string) => {
  if (query === '') {
    return [];

    
  }

  

  let professions =  [];
    for(let i=0 ; i<dataProfessions2.length ; i++){
      if(dataProfessions2[i].label.toLowerCase().startsWith(query.toLowerCase())){
        professions.push(dataProfessions2[i])
      }
    }

    
    return professions
}
const data1 = findData(Query)

  function onChangeText (text : string){
    var i=0
    for(i=0 ; i<dataProfessions2.length ; i++){
      if(dataProfessions2[i].label.startsWith(text))
      setdataProfessionals((prevData) => [...prevData, dataProfessions2[i]])
    }
  }

  const LimitedWordsText = ({ text, limit } : {text : string, limit : number}) => {
    const words = text.split(' ');
    let newText;
  
    const limitedWords = words.slice(0, limit);

  
    let limitedText = limitedWords.join(' ');

    if(words.length > limit){
      newText = limitedText.concat('...')
    }

  
    return <Text>{newText}</Text>;
  };

  
  const renderCarouselItem = ({item} : {item : article}) => (
    <TouchableOpacity onPress={()=> {
      Linking.openURL(item.ref)
      .catch((err) => console.error('An error occurred', err));
    }}>
      <View style={styles.carouselContainer}>
      <View style={styles.authorAndDateContainer}>
        <Text style={styles.text}>{item.author + ", " + item.date}</Text>
      </View>

      <View>
        <Image style={styles.articleImage} source={{uri : item.imageuri}} />
      </View>

      <View style={styles.titleAndDescription}>
        <Text style={styles.text} >{item.title}</Text>

        <Text style={styles.text}>
        <LimitedWordsText text={item.description} limit={35} />
        </Text>
       
      </View>
    </View>

    </TouchableOpacity>
    
  )
  

 
  return (
    <BackgroundView children={

      

      <ScrollView>


        
         <View style={styles.container}>
        <View style={styles.logoContainer} >
          {/* <Image source={require('../../../icon.jpg')} style={styles.imageStyle}/> */}

          <SvgUri uri={"https://www.svgrepo.com/show/295352/sharing-home.svg"} width={"80"} height={"80"} fill={"white"} />
        </View>


<View style={styles.container2}>
<View style={styles.numOfUsersContainer}>
          <Text style={styles.textStyle2 }>{data} App users</Text>

         
        </View>
        
        <View style={styles.autoCompleteAndIcon}>

          <EvilIcons name='search' size={40} style={{backgroundColor : "rgb(255,255,255)"}} />
        <View style={styles.autocompleteContainer}  >
          
          <AutocompleteInput    listContainerStyle={{marginTop : 5, left : -10  }}  data={data1}    onChangeText={(text) => setQuery(text)} value={Query}
          flatListProps={{
            keyExtractor: (item) => item.value ,
            renderItem:renderProfession
          }}
        placeholder="Enter Profession"
      />  
          
        </View>
        </View>

</View>
          <View style={styles.popularProfessionsContainer} >
            <Text style={{color : "white",  fontSize : 20, fontWeight :"bold"}}>Popular Professions</Text>
          <View style={styles.carouselProfessions}>
                
                <Carousel data={popularProfessions} renderItem={renderPopularProfessions} sliderWidth={250} itemWidth={250}  />
                

                </View>
          </View>
      
      
       
     

        <View style={styles.carousel}>
          
         <Carousel data={articles} renderItem={renderCarouselItem} sliderWidth={350} itemWidth={350} />
  
        </View>


        <View style={styles.ratingContainer}>
          <Text style={{color : "white", fontSize : 20, fontWeight : "500"}}>Rate this App</Text>
          <AirbnbRating starContainerStyle={{marginLeft: 2}}  />
        </View>
       
        
      </View>
      </ScrollView>
        
     
    } />

    
  )

  
  
}

export default HomePage

const styles = StyleSheet.create({

  ratingContainer : {
    alignItems : "center",
    height : 150,
    justifyContent : "space-between",
    marginBottom : 50, 
  },

  popularProfessionsContainer : {
    paddingLeft : 15,
    zIndex : -2
  },

  carouselProfessions : {
    alignItems : "center",
    height : 275,
    zIndex : -1,
    flexDirection: "row",
   
  },

  container2 : {
    height : 160
  },

  titleAndDescription : {
    alignItems : "center",
    justifyContent : "space-between",
    height : 250,
  },
  carousel : {
    alignItems : "center",
    height : 600,
    zIndex : -1,
    flexDirection: "row",
    marginBottom : 50
    
  },
  authorAndDateContainer : {
    height : 80,
    justifyContent : "center",
    alignItems :"center",
  },

  carouselContainer : {
    backgroundColor :Colors.$backgroundDark,
    
  },

  articleImage : {
    width : "100%",
    height : 200,
  },

  text : {
    color : "white",
    fontSize : 20
  },

  articlesContainer : {

  },

  imageStyle : {
    height:150,
    width:150,
    

  },
  autocompleteContainer: {
    flex: 1,
    left: 41,
    position: 'absolute',
    right: 20,
    top: 0,
    zIndex: 2,

  },

  autoCompleteAndIcon : {
    display :"flex",
    flexDirection :"row",
    height:41.5,
    
  },

  pressable : {
    backgroundColor : "white",
    paddingRight : 5,
    justifyContent : "center",
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
 
  icon: {
    marginRight: 5,
  },

  logoContainer : {
   alignItems:"center",
   height : 100,
   marginBottom : 30,
  
  },

  container : {
    padding : 8,
    display : "flex",
    flexDirection : "column",
    justifyContent :"space-between",
     height:"100%",
     paddingTop: 20,
     
    },
    textStyle1 : {
      color : "white",
      fontSize: 30,
    }
    ,
    textStyle2 : {
      color : "white",
      fontSize: 30,
    },
    numOfUsersContainer : {
      alignItems : "center",
      height : 75,
      marginBottom : 2
    }


});

