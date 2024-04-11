import React from 'react'
import { View,StyleSheet, TouchableOpacity, ScrollView,Text } from 'react-native'
import BackgroundView from '../../Components/Layout/BackgroundView'
import MyTextInput from '../../Components/Controls/MyTextInput'
import PersonCard from '../../Features/Persons/PersonCard'
import { Ionicons,EvilIcons } from '@expo/vector-icons';
import { useGetAllUsersQuery } from '../../Services/Redux/Api'
import ProButton from '../../Components/Controls/ProButton'
import { Colors } from 'react-native-ui-lib'


interface FriendsProps { 

  a : number

}

const Friends : React.FC<FriendsProps> = (props) => {
  const { data, isSuccess, isError, error, refetch } = useGetAllUsersQuery({});
  console.log(props.a)
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
          <PersonCard user={friend} imageurl={'../../../gardner2.png'} imageStyle={styles.photoStyle} componentsUnderImage={[<Text style={{ color: "white" }}> {friend.name.firstName} {friend.name.lastName}</Text>,

              <Text style={{ color: "white" }}>Software Engineering</Text>
              ]} additionalComponents={[<ProButton text={"Chat"} mobileWidth={180} />]} cardContainerStyle={styles.CardContainer}/>
           
           
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

  CardContainer : {
    backgroundColor:Colors.$backgroundDark,
    width:180,
    height:180,
    alignItems:"center",
    justifyContent:"center",
    
  },

  photoStyle : {
    height: 100,
    width: 100,
    borderRadius:70,
    marginBottom:8,
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
