import React, { ReactElement, useEffect, useState } from 'react'
import { View, Text, Modal, Button, TextInput, ImageStyle, ViewStyle, StyleProp } from 'react-native'
import { ScrollView, StyleSheet } from 'react-native'
import { User, useFindUserByProfessionQuery, useGetAllUsersByWorkAreaQuery, useGetAllUsersQuery } from '../../Services/Redux/Api';
import BackgroundView from '../../Components/Layout/BackgroundView';

import { TouchableOpacity } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import ModalDesigned from '../../Navigation/ModalDesigned';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyTextInput from '../../Components/Controls/MyTextInput';
import RNPickerSelect from 'react-native-picker-select';
import PersonCard from './PersonCard';
import { AirbnbRating } from 'react-native-ratings';
import { Colors } from 'react-native-ui-lib';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedPersonsPage, getSelectedProfession } from '../../Services/Redux/Slices/PersonsPageSlice';
import { IS_WEB, PersonPage1, PersonPage2, defaultWidthValues, sort } from '../../Constants/Values';
import ProButton from '../../Components/Controls/ProButton';
import { checkName } from '../../Constants/Functions/Functions';
import { Dropdown } from 'react-native-element-dropdown';
import DesignedDropDown from '../../Navigation/DesignedDropDown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getSortBy, setSortBy } from '../../Services/Redux/Slices/SortBySlice';
import { setChat } from '../../Services/Redux/Slices/ChatSlice';
import { database, auth } from '../../Services/Firebase/Firebase';
import { getUserAccount } from '../../Services/Redux/Slices/AuthSlice';






const PersonsPage = () => {
  let profession = useSelector(getSelectedProfession);
  let user = useSelector(getUserAccount);
  console.log(profession)
  const { data, isSuccess, isError, error, refetch } = useFindUserByProfessionQuery({ professionName: profession, workAreas: user?.workAreas });

  console.log(data)

  const [modalVisible, setModalVisible] = useState(false);
  const [Professionals, setProfessionals] = useState(data)
  const [rating, setrating] = useState(0)
  const [experience, setexperience] = useState(0)
  const [location, setlocation] = useState("choose location")

  const [sortby, setsort] = useState("1")
  var textInput = "";
  const componentType = useSelector(getSelectedPersonsPage)
  let data1 = data
  data1 = data1?.filter((user) => user.email !== auth.currentUser?.email)

  const dispatch = useDispatch();

  let sortBy = useSelector(getSortBy)
  let PersonPage = componentType == "Rating" ? PersonPage2 : PersonPage1

  const navigation = useNavigation();
  const isWeb = IS_WEB();
  const width = defaultWidthValues();
  const adjustedWidth = typeof width === 'number' ? width + 200 : width;
  function renderComponent(rating: number) {
    return componentType == "Rating" ? [<AirbnbRating
      defaultRating={rating}
      count={5}
      size={25}
      isDisabled={true}
      showRating={false} starContainerStyle={{ marginTop: 5 }} />] : [<ProButton text={"Chat"} mobileWidth={180} />]
  }

  function CheckValidation(professional: User) {
    if (professional.rating === undefined)
      professional.rating = 0;
    if (professional.name.firstName === undefined || professional.name.lastName === undefined) {
      professional.name.lastName = "aaa";
      professional.name.firstName = "aaa";
    }
    if (professional.experience === undefined)
      professional.experience = 0;
  }

  function onChangeText(text: string) {
    textInput = text;
    filterProfessionals()
  }

  useEffect(() => {
    filterProfessionals()
  }, [data]);


  function filterProfessionals() {
    setProfessionals(data1?.filter((professional) => {

      if (professional.rating === undefined)
        professional.rating = 0;
      if (professional.name.firstName === undefined || professional.name.lastName === undefined) {
        professional.name.lastName = "aaa";
        professional.name.firstName = "aaa";
      }
      if (professional.experience === undefined)
        professional.experience = 0;
      return professional.rating >= rating && checkName(textInput, professional.name.firstName, professional.name.lastName) &&
        professional.experience >= experience;

    }))
  }

  return (
    <BackgroundView children={
      <ScrollView>

      <View style={[styles.container, {backgroundColor: Colors.backgroundSecondary}, isWeb ? {width: adjustedWidth} : {}]}>
        {PersonPage.setButtons && <View style={styles.filterAndSortContainer}>
          <View style={styles.sortOrFilter} >
            <Text style={{ color: Colors.textPrimary, fontSize: 18 }}>Filters</Text>
            <TouchableOpacity style={styles.filterButton} onPress={() => {
              setModalVisible(true);
            }}>
              <Ionicons name='filter' size={45} color={"black"} />
            </TouchableOpacity>
          </View>

          <View style={[styles.sortOrFilter, {alignItems: 'center', alignContent: 'center'}]}>
            <Text style={{ color: Colors.textPrimary, fontSize: 18 }}>Sort</Text>
            <RNPickerSelect placeholder={{label: 'Sort By'}}
              style={{
                inputIOS: {
                  backgroundColor: "white",
                },
                inputAndroid: {
                  backgroundColor: "white",
                  width: 200,

                  height: 68,
                },
                inputWeb: {
                  backgroundColor: "white",
                  width: 200,
                  height: 68,
                },
              }} items={sort} onValueChange={(value) => {
                sortBy = value;
                dispatch(setSortBy({ sortBy: value }));
                filterProfessionals();
              }} />
          </View>
        </View>
        }

        <MyTextInput placeHolder={'Search Professional'} icon={<EvilIcons name='search' size={45} style={{ backgroundColor: "white" }} />} onChange={onChangeText} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalDesigned visibleModal={setModalVisible} setRating={setrating} setExperience={setexperience} experience={experience} rating={rating} setLocation={setlocation} location={location} filterProfessionals={filterProfessionals} sortBy={sortby} setSort={setsort} />
        </Modal>

          <View style={styles.Professionalcontainer}>
            {isSuccess && Professionals?.slice().sort((a, b) => {

              if (sortBy === "0") {
                return 0;
              }

              if (sortBy === "1") {
                if (a.experience === undefined) {
                  a.experience = 0;
                }

                if (b.experience === undefined) {
                  b.experience = 0;
                }
                if (a.experience < b.experience) return 1;
                if (a.experience > b.experience) return -11;
                return 0;
              }

              if (sortBy === "2") {
                if (a.rating === undefined) {
                  a.rating = 0;
                }

                if (b.rating === undefined) {
                  b.rating = 0;
                }
                if (a.rating < b.rating) return 1;
                if (a.rating > b.rating) return -1;
                return 0;
              }


            })?.map((Professional) => {
              if (Professional.rating === undefined) {
                Professional.rating = 0;
              }
              return (
                <View key={Professional.id + "_V"} style={{alignContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity style={styles.touchableOpacityStyle} onPress={() => {
                    dispatch(setChat({ ReceiverEmail: Professional.email, openModal: false, receiverUserName: Professional.name.firstName + " " + Professional.name.lastName, receiverPhotoUrl: Professional.photoUrl, receiverUser : Professional }))
                    navigation.navigate("Chats")
                  }}>
                    <PersonCard user={Professional} imageStyle={PersonPage.imageStyle} componentsUnderImage={[
                    <Text style={{ color: "black", marginTop: 5, fontSize:18, fontWeight: 'bold' }}> {Professional.name.firstName} {Professional.name.lastName}</Text>,
                    <Text style={{ color: 'black', marginTop: 5, fontSize:16, fontWeight: 'bold' }}>{Professional.userProfessions[0]?.profession?.name}</Text>,
                    <Text style={{ color: 'black', marginTop: 5, fontSize:14 }}>{Professional.experience} years experience</Text>
                    ]} additionalComponents={renderComponent(Professional.rating)} cardContainerStyle={PersonPage.CardContainerStyle} containerStyle={{ backgroundColor: Colors.controlBackground, marginTop: 10, paddingBottom: 5, borderRadius:5 }} />


                  </TouchableOpacity>
                </View>

              )
            })
            }
          </View>
      </View>
      </ScrollView>

    } />
  )
}


export default PersonsPage

const styles = StyleSheet.create({
  CardContainer: {
    backgroundColor: Colors.$backgroundDark,
    // borderColor:"green",
    // borderWidth:5,
    width: 190,
    height: 220,
    alignItems: "center",
    justifyContent: "center",

  },
  imageStyle: {
    height: 120,
    width: 120,
    borderRadius: 70,
  },
  textInputStyle: {
    backgroundColor: "white",
    paddingLeft: 5,
    height: 50,
  },
  sortOrFilter: {
    display: "flex",
    flexDirection: "column",    
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 15
  },
  filterAndSortContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",    
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  Professionalcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: "100%",
    flexWrap: "wrap",
    marginBottom: 200,
  },
  touchableOpacityStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  container: {
    gap: 15,
    padding: 10,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  SortButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: 70,
    alignItems: "center",
    height: 68,
  },
  filterButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: 70,
    alignItems: "center"
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selector: {
    backgroundColor: "white",
  }
});