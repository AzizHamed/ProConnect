import React from 'react'
import { View,StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import BackgroundView from '../../Components/Layout/BackgroundView'
import MyTextInput from '../../Components/Controls/MyTextInput'
import FriendCard from './FriendCard'
import { Ionicons,EvilIcons } from '@expo/vector-icons';
import { useGetAllUsersQuery } from '../../Services/Redux/Api'


interface FriendsProps { 

}

const Friends : React.FC<FriendsProps> = (props) => {
  const { data, isSuccess, isError, error, refetch } = useGetAllUsersQuery({});
  return (
    <BackgroundView children={

      <View style={styles.container}>

       

        <MyTextInput placeHolder={'Search Professional'} icon={<EvilIcons name='search'  size={45} style={{backgroundColor:"white"}}/>} onChange={()=>{

        }} />

      

       

       



     

     <ScrollView>

     

     <View style={styles.Professionalcontainer}>

     

      {isSuccess && data?.map( (friend) => {
        return(
          <View>
        <TouchableOpacity style={styles.touchableOpacityStyle}>
          <FriendCard user={friend} imageurl={'../../../gardner2.png'}/>
           
           
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

export default Friends

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
