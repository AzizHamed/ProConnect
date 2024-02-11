import React, { useEffect, useState } from 'react'
import { View,Text, Modal, Button, TextInput } from 'react-native'
import {ScrollView, StyleSheet} from 'react-native'
import { useGetAllUsersQuery } from '../../Services/Redux/Api';
import ProfessionalCard from './ProfessionalCard';
import BackgroundView from '../../Components/Layout/BackgroundView';

import { TouchableOpacity } from 'react-native';
import { Ionicons,EvilIcons } from '@expo/vector-icons';
import ModalDesigned from '../ModalDesigned';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyTextInput from '../../Components/Controls/MyTextInput';
import RNPickerSelect from 'react-native-picker-select';



const ProfessionalsPage = () => {
  const { data, isSuccess, isError, error, refetch } = useGetAllUsersQuery({});
  const [modalVisible, setModalVisible] = useState(false);
  const [Professionals, setProfessionals] = useState(data)
  const [rating, setrating] = useState(0)
  const [experience, setexperience] = useState(0)
  const [location, setlocation] = useState("choose location")
  var textInput = "";
  const [sortBy, setsortBy] = useState(0)
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
      return professional.rating >= rating && checkName(textInput,professional.name.firstName , professional.name.lastName)  && professional.experience >= experience;
    
    }))
  }

  function checkName(text : string, firstName : string, lastName : string){
    return firstName.toLowerCase().startsWith(text.toLowerCase()) || lastName.toLowerCase().startsWith(text.toLowerCase()) || (firstName.toLowerCase() + "" + lastName.toLowerCase()).startsWith(text.toLowerCase())
  }

  function sort1 (value : number) {
    filterProfessionals()
    if(value==0)
    setProfessionals(Professionals?.sort((professional1, professional2) => {
    return professional1.experience - professional2.experience;
  }
    ))

    else
    if(value==1)
    setProfessionals(Professionals?.sort((professional1,professional2) => {
  return professional1.rating - professional2.rating;
  }))


  }
    
  


  

  
  return (
    <BackgroundView children={

      <View style={styles.container}>

        <View style={styles.filterAndSortContainer}>
        
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
            {/* <TouchableOpacity style={styles.filterButton} onPress={()=> {
              setModalVisible(true);
              }}>
              <FontAwesome name='sort' size={47} color={"black"}/>
              </TouchableOpacity> */}

            <RNPickerSelect
                      onValueChange={(value) => sort1(value) }
                      items={sorts}
                      style={{viewContainer: {backgroundColor : "white"}}}        />

            </View>
            
                
        </View>

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
          <ProfessionalCard user={Professional} imageurl={'../../../gardner2.png'}/>
           
           
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


export default ProfessionalsPage

const styles = StyleSheet.create({

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
