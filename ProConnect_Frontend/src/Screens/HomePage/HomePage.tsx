import React, { useState } from 'react'
import BackgroundView from '../../Components/Layout/BackgroundView'
import { StyleSheet, Image, Linking, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native-ui-lib';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AutocompleteInput from 'react-native-autocomplete-input'
import { IS_WEB, articles, dataProfessions2, popularProfessions } from '../../Constants/Values';
import { Colors } from 'react-native-ui-lib';
import { useGetAllArticlesQuery, useGetAllUsersNumberQuery, useGetSearchesNumbersQuery } from '../../Services/Redux/Api';
import { ScrollView } from 'react-native-gesture-handler';
import renderItem from '../../Components/Layout/AutoCompleteItem';
import renderPopularProfessions from '../../Components/Layout/RenderPopularProfessionsCard';
import { AirbnbRating } from 'react-native-ratings';
import ProCarousel from '../../Components/Controls/ProCarousel';
import ProHeader, { HeaderType } from '../../Components/Layout/ProHeader';
import HomeIcon from '../../SVG/HomeIcon';
import ProList from '../../Components/Layout/ProList';
import ProButton from '../../Components/Controls/ProButton';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setPersonsPage } from '../../Services/Redux/Slices/PersonsPageSlice';
import SVGIconContainer from '../../Components/Layout/SVGIconContainer';



interface article {
  title: string
  description: string;
  date: string;
  ref: string;
  imageuri: string;
  author: string;
}

interface Item {
  label: string;
  value: string;
  component: React.FC
}



const HomePage = () => {

  const [Value, setValue] = useState("Search")
  const [focus, setfocus] = useState(false)
  const [Query, setQuery] = useState("")
  const [dataProfessionals, setdataProfessionals] = useState([{}])
  const { data, isSuccess, isError, error, refetch } = useGetAllUsersNumberQuery();
  const isWeb = IS_WEB();
  const navigation = useNavigation();
  // const Articles = useGetAllArticlesQuery({})

  const searches = useGetSearchesNumbersQuery()
  


  
  
  const dispatch = useDispatch()

  const findData = (query: string) => {
    if (query === '') {
      return [];
    }

    let professions = [];
    for (let i = 0; i < dataProfessions2.length; i++) {
      if (dataProfessions2[i].label.toLowerCase().startsWith(query.toLowerCase())) {
        professions.push(dataProfessions2[i])
      }
    }

    return professions
  }

  const data1 = findData(Query)

  function onChangeText(text: string) {
    var i = 0
    for (i = 0; i < dataProfessions2.length; i++) {
      if (dataProfessions2[i].label.startsWith(text))
        setdataProfessionals((prevData) => [...prevData, dataProfessions2[i]])
    }
  }

  const LimitedWordsText = ({ text, limit }: { text: string, limit: number }) => {
    const words = text.split(' ');
    let newText;

    const limitedWords = words.slice(0, limit);


    let limitedText = limitedWords.join(' ');

    if (words.length > limit) {
      newText = limitedText.concat('...')
    }


    return <Text>{newText}</Text>;
  };

  const renderAutoCompleteItem = ({ item }: { item: Item }) => (
     
  
      
    <TouchableOpacity style={styles.pressable} onPress={()=>{
      dispatch(setPersonsPage({ComponentType : "Rating", profession : item.label}))
      navigation.navigate("PersonsPage")
    }}>
      
      <View invisible style={styles.autoCompleteItemsStyle}>
        <View invisible style={{height:"100%", justifyContent :"center"}}>
        <Text style={{color :"black"}}>{item?.label}</Text>
        </View>
  
        <View invisible style={{height:"100%", justifyContent :"center"}}>
        <SVGIconContainer iconComponent={item.component} color={Colors.$backgroundDarkActive} width={40} height={40}/>
  
        {/* <SvgUri
        width="40"
        height="40"
        uri={item.uri}
        fill={Colors.$backgroundDarkActive}
      /> */}
        
        </View>
      </View>
    </TouchableOpacity>
    );


  const renderCarouselItem = ({ item }: { item: article }) => (
    <View style={{ backgroundColor: Colors.$backgroundDark, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
      <View style={styles.overflow} invisible marginV-10>
        <Text h4 numberOfLines={3} adjustsFontSizeToFit allowFontScaling>{item.title}</Text>
      </View>
      {isWeb ?
        <View invisible row marginB-20>


          <View invisible style={[styles.overflow, { width: "65%" }]}>
            <Text h4>{item.author}</Text>
            <Text h4l>{item.date}</Text>
            <Text style={styles.overflow} lineBreakMode='clip' numberOfLines={7}>{item.description}</Text>
          </View>
          <Image style={{ width: "30%", height: "100%", top: 0, right: 0 }} source={{ uri: item.imageuri }} resizeMode='contain' />
        </View>
        :
        <View invisible>

          <View invisible>
            <Image style={{ width: "100%", height: 200 }} source={{ uri: item.imageuri }} resizeMode='cover' />
          </View>

          <View invisible style={styles.overflow}>
            <Text h4>{item.author}</Text>
            <Text h4l>{item.date}</Text>
            <Text body style={styles.overflow} lineBreakMode='clip' numberOfLines={7}>{item.description}</Text>
          </View>
        </View>

      }
      <ProButton webWidth={"100%"} mobileWidth={"100%"} text='Read' marginB-20 onPress={() => {
        Linking.openURL(item.ref)
          .catch((err) => console.error('An error occurred', err));
      }} />
    </View>
  )

  return (
    <BackgroundView children={
      <ScrollView>
        <View padding-8 paddingT-20 spread height='100%' >
          <View center height='100' >
            <HomeIcon width={80} height={80}></HomeIcon>
            <Text>ProConnect</Text>
          </View>
          
          

          <View marginT-20 marginB-30 style={{ zIndex: 10 }}>
            <View center marginB-2>
              {data && <ProHeader text={`${searches.currentData}`} headerType={HeaderType.H3} />}
            </View>
            <View center style={styles.autoCompleteAndIcon}>
              <View style={styles.autocompleteContainer} flexG >
                <EvilIcons name='search' size={30} style={{ backgroundColor: Colors.white, zIndex: 6, position: 'absolute', left: 5, top: 5 }} />
                <AutocompleteInput listContainerStyle={{ marginTop: 5, width: "100%" }} data={data1} onChangeText={(text) => setQuery(text)} value={Query} style={{ paddingLeft: 40 }}
                  flatListProps={{
                    keyExtractor: (item) => item.value,
                    renderItem: renderAutoCompleteItem,
                    disableVirtualization: true,
                  }}
                  scrollEnabled={false}
                  placeholder="Enter Profession"
                />
              </View>
            </View>
          </View>
          <View style={styles.popularProfessionsContainer} >
            <Text h3 center>Popular Professions</Text>
            <View style={styles.carouselProfessions}>
              {isWeb ?
                <ProList data={[...popularProfessions, ...popularProfessions]} renderItems={renderPopularProfessions} itemScale={0.8} />
                :
                <ProCarousel displayArrows data={popularProfessions} renderItems={renderPopularProfessions} width={250} height={250} overflow='visible' mode='parallax' />
              }
            </View>
          </View>
          <View center>
            <Text h3 center>Articles</Text>
            <ProCarousel data={articles} renderItems={renderCarouselItem} width={isWeb ? 650 : undefined} height={isWeb ? 400 : 650} mode='parallax' parallaxScrollingOffset={isWeb ? 80 : 60} displayArrows arrowOffset={isWeb ? 20 : 10} />
          </View>
          <View style={styles.ratingContainer}>
            <Text h3>Rate this App</Text>
            <AirbnbRating starContainerStyle={{ marginLeft: 2 }} />
          </View>
        </View>
      </ScrollView>

    } />
  )
}

export default HomePage

const styles = StyleSheet.create({

  ratingContainer: {
    alignItems: "center",
    height: 150,
    justifyContent: "space-between",
    marginBottom: 50,
  },

  popularProfessionsContainer: {
    zIndex: -2,
    textAlign: 'center',
    marginBottom: 40
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  carouselProfessions: {
    alignItems: "center",
    // height: 275,
    zIndex: -1,
    // flexDirection: "row",

  },

  container2: {
    height: 160,
    marginTop: 20,
  },

  titleAndDescription: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 250,
  },
  carousel: {
    alignItems: "center",
    height: 600,
    zIndex: -1,
    // flexDirection: "row",
    marginBottom: 50

  },
  authorAndDateContainer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  carouselContainer: {
    backgroundColor: Colors.$backgroundDark,
  },

  articleImage: {
    width: "100%"
  },

  text: {
    color: "white",
    fontSize: 20
  },

  articlesContainer: {},
  imageStyle: {
    height: 150,
    width: 150,
  },
  autocompleteContainer: {
    flex: 1,
    left: 45,
    position: 'absolute',
    right: 45,
    top: 0,
    zIndex: 2,

  },

  autoCompleteAndIcon: {
    display: "flex",
    flexDirection: "row",
    height: 41.5,

  },

  pressable: {
    backgroundColor: "white",
    paddingRight: 5,
    justifyContent: "center",
  },

  autoCompleteItemsStyle: {
    backgroundColor: "white",
    height: 60,
    justifyContent: "space-between",
    borderColor: "black",
    borderBottomWidth: 1,
    paddingLeft: 10,
    flexDirection: "row",
    width: "100%"
  },

  icon: {
    marginRight: 5,
  },

  logoContainer: {
    alignItems: "center",
    height: 100,
  },

  container: {
    padding: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    paddingTop: 20,

  },
  textStyle1: {
    fontSize: 30,
  }
  ,
  textStyle2: {
    fontSize: 30,
  },
  numOfUsersContainer: {
    alignItems: "center",
    height: 75,
    marginBottom: 2
  },
  overflow: {
    overflow: "hidden",
  }

});

