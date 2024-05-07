import React, { useEffect, useState } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native';
import BackgroundView from '../Components/Layout/BackgroundView';
import { Dropdown } from 'react-native-element-dropdown';
import DesignedDropDown from './DesignedDropDown';
import { TextInput } from 'react-native-gesture-handler';
import ProButton from '../Components/Controls/ProButton';
import RNPickerSelect from 'react-native-picker-select';
import { User } from '../Services/Redux/Api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { getSortBy } from '../Services/Redux/Slices/SortBySlice';
import { Colors } from 'react-native-ui-lib';
import { IS_WEB, defaultWidthValues } from '../Constants/Values';
interface ModalDesignedProps {
  visibleModal: (bool: boolean) => void;
  setRating: (rating: number) => void
  setExperience: (experience: number) => void
  setLocation: (location: string) => void
  filterProfessionals: () => void
  experience: number
  rating: number
  location: string;
  sortBy: string;
  setSort: (sort: string) => void
}


const ModalDesigned: React.FC<ModalDesignedProps> = (props) => {
  const [isFocusLocation, setisFocusLocation] = useState(false)
  const [Experience, setExperience] = useState([{ label: '0+', value: 0 }]);
  const [Ratings, setRatings] = useState([{ label: '0+', value: 0 }]);
  const [reset, setreset] = useState(false)

  const sort = useSelector(getSortBy)
  const isWeb = IS_WEB();
  const width = defaultWidthValues();
  const adjustedWidth = typeof width === 'number' ? width + 200 : width;
  var rating = props.rating;
  var experience = props.experience;

  useEffect(() => {
    function createYears() {
      var i;
      var years = [];

      for (i = 0; i < 31; i++)
        if (i % 5 == 0)
          years.push({ label: i.toString() + "+", value: i })

      return years;
    }

    function createRatings() {
      var ratings = [];
      var i;
      for (i = 0; i < 5; i++)
        ratings.push({ label: i.toString() + "+", value: i });
      return ratings;
    }

    setExperience(createYears());
    setRatings(createRatings());


  }, [])





  return (
    <BackgroundView
      children={

        <View style={[styles.container, isWeb ? { width: 300, alignItems: 'center', alignContent: 'center', alignSelf: 'center' } : {}]}>

          <View style={styles.textAndComponentStyle}>
            {/* 
                <View >
                  <Text style={{color : "white"}}>Location</Text>
                  {!reset && <DesignedDropDown initialValue={props.location} setValue={props.setLocation} values={dataLocation} leftIcon={<FontAwesome
                  style={styles.icon}
                   color={isFocusLocation ? 'tomato' : 'black'}
                   name="map-marker"
                  size={20}
            />}/> }
                  {reset &&<DesignedDropDown initialValue={"choose location"} setValue={props.setLocation} values={dataLocation} leftIcon={ <FontAwesome
                  style={styles.icon}
                   color={isFocusLocation ? 'tomato' : 'black'}
                   name="map-marker"
                  size={20}
            />}/> }
                  
                </View> */}

            <View>
              <Text style={{ color: Colors.textPrimary, fontSize: 18 }}>Experience</Text>
              <RNPickerSelect
                onValueChange={(value) => props.setExperience(value)}
                items={Experience}
                value={experience}
                style={{ viewContainer: { backgroundColor: "white" }, inputWeb: { height: 50 }, }} />
            </View>


            <View style={{marginVertical: 20}}>
              <Text style={{ color: Colors.textPrimary, fontSize: 18 }}>Rating</Text>
              <RNPickerSelect
                onValueChange={(value) => props.setRating(value)}
                items={Ratings}
                value={rating}
                style={{
                  viewContainer: {
                    backgroundColor: "white",
                  }, inputWeb: { height: 50 },
                }} />
            </View>

          </View>

          <View style={{ alignItems: "center", marginTop: 10 }}>


            <ProButton text={"Continue"} onPress={() => {
              props.setSort(sort)
              props.filterProfessionals();
              props.visibleModal(false);
            }} />

            <ProButton text={"Reset"} onPress={() => {
              props.setExperience(0)
              props.setRating(0)
              rating = 0
              experience = 0
              setreset(true);
            }} />
          </View>




        </View>
      }
    />

  )
}

export default ModalDesigned


const styles = StyleSheet.create({

  icon: {
    marginRight: 5,
  },

  textAndComponentStyle: {
    // height : 175,
    justifyContent: "space-between",
  },

  pickerStyle: {
    backgroundColor: "white",
  },
  mainContainer: {
    height: "100%",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    marginTop: 20,
    height: "45%",
    justifyContent: "space-between",
  },

});

