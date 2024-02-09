import React, { useState } from 'react'
import { View,Text, Modal, Button, TextInput } from 'react-native'
import {ScrollView, StyleSheet} from 'react-native'
import { useGetAllUsersQuery, useGetUserQuery } from '../../Services/Redux/Api';
import ProfessionalCard from './ProfessionalCard';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ProRefreshControl from '../../Components/Controls/ProRefreshControl';
import ProButton from '../../Components/Controls/ProButton';
import LoadingOrError from '../../Components/Layout/LoadingOrError';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons,EvilIcons } from '@expo/vector-icons';
import ModalDesigned from '../ModalDesigned';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyTextInput from '../../Components/Controls/MyTextInput';

const ProfessionalsPage = () => {
  const navigation = useNavigation();
  const { data, isSuccess, isError, error, refetch } = useGetAllUsersQuery({});
  const [modalVisible, setModalVisible] = useState(false);
  
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
            <TouchableOpacity style={styles.filterButton} onPress={()=> {
              setModalVisible(true);
              }}>
              <FontAwesome name='sort' size={47} color={"black"}/>
              </TouchableOpacity>

            </View>
            
                
        </View>

        <MyTextInput/>

       <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >

     <ModalDesigned visibleModal={()=> {
      setModalVisible(false);
     }} />
      </Modal>

       



     

     <ScrollView>

     

     <View style={styles.Professionalcontainer}>

     

      {isSuccess && data.map( (Professional) => {
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
