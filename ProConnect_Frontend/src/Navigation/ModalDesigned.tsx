import React, { useEffect, useState } from 'react'
import { Modal, View,Text,StyleSheet } from 'react-native';
import BackgroundView from '../Components/Layout/BackgroundView';
import { Dropdown } from 'react-native-element-dropdown';
import DesignedDropDown from './DesignedDropDown';
import { TextInput } from 'react-native-gesture-handler';
import ProButton from '../Components/Controls/ProButton';
import RNPickerSelect from 'react-native-picker-select';
interface ModalDesignedProps {
  visibleModal : ()=> void;
}

const ModalDesigned : React.FC<ModalDesignedProps> = (props) => {
const [Experience, setExperience] = useState([{label : '0+' , value : 0}]);
const [Ratings, setRatings] = useState([{label : '0+' , value : 0}]);
useEffect(() => {
  function createYears() {
    var i;
    var years = [];
   
    for(i=0 ; i<31 ; i++)
    if(i%5==0)
    years.push({label : i.toString() + "+", value : i})
  
  return years;
  }

  function createRatings (){
    var ratings = [];
    var i;
    for(i=0 ; i<5 ; i++)
    ratings.push({label : i.toString() + "+", value : i});
  return ratings;
  }

  setExperience(createYears());
  setRatings(createRatings());

  
}, [])

{/*  */}
  
  return (
<BackgroundView
      children={
          
            <View style={styles.container}>

              <View style={styles.textAndComponentStyle}>

                <View >
                  <Text style={{color : "white"}}>Location</Text>
                  <DesignedDropDown/>
                </View>

                <View>
                  <Text style={{color : "white"}}>Experience</Text>
                  <RNPickerSelect
                      onValueChange={(value) => console.log(value)}
                      items={Experience}
                      style={{viewContainer: {backgroundColor : "white"}}}        />
                    </View>


                    <View>
                  <Text style={{color : "white"}}>Rating</Text>
                  <RNPickerSelect
                      onValueChange={(value) => console.log(value)}
                      items={Ratings}
                      style={{viewContainer: {backgroundColor : "white", 
                    }}}        />
                    </View>

              </View>
              

              <ProButton text={"Continue"} onPress={()=>{
                props.visibleModal()
                }} />
           
            
          </View>
      }
    />

  )
}

export default ModalDesigned


const styles = StyleSheet.create({

  textAndComponentStyle : {
    height : 250,
     justifyContent : "space-between",
  },

  pickerStyle : {
    backgroundColor :"white",
  },
  mainContainer:{
    height:"100%",
  },

  container: {
    display:"flex",
    flexDirection:"column",
    padding: 16,
    height : "45%",
    justifyContent:"space-between",
  },

});

