import React, { ReactElement, useEffect, useState } from 'react'
import { View,Text, Modal, Button, TextInput, ImageStyle, ViewStyle, StyleProp } from 'react-native'
import {ScrollView, StyleSheet} from 'react-native'
import { useGetAllUsersQuery } from '../../Services/Redux/Api';
import BackgroundView from '../../Components/Layout/BackgroundView';

import { TouchableOpacity } from 'react-native';
import { Ionicons,EvilIcons } from '@expo/vector-icons';
import ModalDesigned from '../ModalDesigned';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyTextInput from '../../Components/Controls/MyTextInput';
import RNPickerSelect from 'react-native-picker-select';
import PersonCard from './PersonCard';
import { AirbnbRating } from 'react-native-ratings';
import { Colors } from 'react-native-ui-lib';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getSelectedPersonsPage } from '../../Services/Redux/Slices/PersonsPageSlice';
import { PersonPage1, PersonPage2 } from '../../Constants/Values';
import ProButton from '../../Components/Controls/ProButton';
import { checkName } from '../../Constants/Functions/Functions';






const PersonsPage = () => {
  const { data, isSuccess, isError, error, refetch } = useGetAllUsersQuery({});
  const [modalVisible, setModalVisible] = useState(false);
  const [Professionals, setProfessionals] = useState(data)
  const [rating, setrating] = useState(0)
  const [experience, setexperience] = useState(0)
  const [location, setlocation] = useState("choose location")
  var textInput = "";
  const [sortBy, setsortBy] = useState(0)
 const componentType = useSelector(getSelectedPersonsPage)

let PersonPage = componentType == "Rating" ? PersonPage2 : PersonPage1




  function renderComponent(rating : number){
    return componentType == "Rating" ? [<AirbnbRating
      defaultRating={rating}
      count={5}
      size={20}
      isDisabled={true}
      showRating={false} />] : [<ProButton text={"Chat"} mobileWidth={180} />]
  }

 




  function onChangeText(text : string){ 

    textInput = text;
    filterProfessionals()
    
    }

    const sorts = [{label : "Expereince", value : 0}, {label : "Rating", value :1 }]


  useEffect(() => {
    
    
    filterProfessionals()
    
  }, [data])

  

  function filterProfessionals(){
    setProfessionals(data?.filter((professional)=> {
     
      if(professional.rating===undefined)
      professional.rating = 0
    if(professional.name.firstName===undefined || professional.name.lastName===undefined){
      professional.name.lastName="aaa"
    professional.name.firstName = "aaa"
    }
    if(professional.experience===undefined)
      professional.experience = 0;
      return professional.rating >= rating && checkName(textInput,professional.name.firstName , professional.name.lastName)  && 
      professional.experience >= experience;
    
    }))
  }

  

 
    
  


  

  
  return (
    <BackgroundView children={

      <View style={styles.container}>

        {PersonPage.setButtons && <View style={styles.filterAndSortContainer}>
        
        <View style={styles.sortOrFilter} >
        <Text style={{color:"white", fontSize:20}}>Filters</Text>

          <TouchableOpacity style={styles.filterButton} onPress={()=> {
          setModalVisible(true);
          }}>
          <Ionicons name='filter' size={45} color={"black"}/>
          </TouchableOpacity>
        </View>
       
          
          <View style={styles.sortOrFilter}>
          <Text style={{color:"white", fontSize:20}}>Sort</Text>
          

          </View>
          
              
      </View>}

        <MyTextInput placeHolder={'Search Professional'} icon={<EvilIcons name='search'  size={45} style={{backgroundColor:"white"}}/>} onChange={onChangeText} />

      

       <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >

     <ModalDesigned visibleModal={() => {
            setModalVisible(false);
          } } setRating={setrating} setExperience={setexperience} experience={experience} rating={rating} setLocation={setlocation} location={location} filterProfessionals={filterProfessionals } />
      </Modal>

       



     

     <ScrollView>

     

     <View style={styles.Professionalcontainer}>

     

      {isSuccess && Professionals?.map( (Professional) => {
        return(
          <View>
        <TouchableOpacity style={styles.touchableOpacityStyle}>
          <PersonCard user={Professional} imageurl={'../../../gardner2.png'} imageStyle={PersonPage.imageStyle} compnentsUnderImage={[<Text style={{ color: "white" }}> {Professional.name.firstName} {Professional.name.lastName}</Text>,
              <Text style={{ color: "white" }}>Software Engineering</Text>,
              <Text style={{ color: "white" }}>{Professional.experience} years experience</Text>

            
              
              ]} additionalComponents={renderComponent(Professional.rating)} cardContainerStyle={PersonPage.CardContainerStyle} />
           
           
        </TouchableOpacity>
        </View>

        )
      })}

   
      

     </View>
     </ScrollView>

      </View>

      

    }/>
    
  )
}


export default PersonsPage

const styles = StyleSheet.create({
  CardContainer : {
    backgroundColor:Colors.$backgroundDark,
    // borderColor:"green",
    // borderWidth:5,
    width:190,
    height:220,
    alignItems:"center",
    justifyContent:"center",
    
  },

  imageStyle : {
      height: 120,
      width: 120,
      borderRadius:70,
  },

  textInputStyle : {
    backgroundColor :"white",
    paddingLeft : 5,
    height : 50,
  },

  sortOrFilter : {
    display :"flex",
    flexDirection:"column",
    width:"50%",
  },

  filterAndSortContainer : {
    display :"flex",
    flexDirection:"row",
    justifyContent : "space-between",
    width : "40%",
    
  },
  Professionalcontainer: {
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%",
    flexWrap:"wrap",
    marginBottom:150,
    
  },
  touchableOpacityStyle:{
    alignItems:"center",
    justifyContent:"center",
    marginBottom:15,
  },
  container:{
    gap : 15,
    padding: 10,

  },
  filterButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width:70,
    alignItems:"center"
  },

  filterButtonText: {
    color: 'white',
    fontSize: 16,
  },


});
