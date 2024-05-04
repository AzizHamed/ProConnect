import { ImageStyle, StyleProp, ViewStyle,Animated, Platform } from "react-native";
import { Colors } from "react-native-ui-lib";
import { WidthValues } from "./Types";
import { User } from "../Services/Redux/Api";
import CarpenterIcon from "../SVG/Professions/CarpenterIcon";
import ElectricianIcon from "../SVG/Professions/ElectricianIcon";
import ConstructorIcon from "../SVG/Professions/ConstructorIcon";
import PainterIcon from "../SVG/Professions/PainterIcon";
import PlumberIcon from "../SVG/Professions/PlumberIcon";
import AirConditioningIcon from "../SVG/Professions/AirConditioningIcon";
import GardenerIcon from "../SVG/Professions/GardenerIcon";

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PHONE_REGEX =
/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

let isWeb: boolean | undefined = undefined;
export const IS_WEB = () => {
  if(isWeb === undefined){ 
    isWeb = Platform.OS === 'web';
  }
  return isWeb;
}


export const defaultWidthNumber = 400;
export const defaultWidthPercent = '90%';
export const defaultWidthValues = () => {
  return IS_WEB() ? defaultWidthNumber : defaultWidthPercent;
}

export const customWidthValues = (webWidth?: WidthValues, mobileWidth?: WidthValues) => {
  return IS_WEB() ? (webWidth || defaultWidthNumber) : (mobileWidth || defaultWidthPercent);
}


interface PersonsPageProps {
  setButtons : boolean
  imageStyle : ImageStyle
  CardContainerStyle : StyleProp<ViewStyle>
  ComponentType : "ProButton" | "Rating" 

}


const CardContainer1 : StyleProp<ViewStyle> = {
  backgroundColor:Colors.$backgroundDark,
  width:180,
  height:180,
  alignItems:"center",
  justifyContent:"center",
  
}
const CardContainer2 : StyleProp<ViewStyle> = {
  backgroundColor:Colors.$backgroundDark,
  width:190,
  height:220,
  alignItems:"center",
  justifyContent:"center",
  
}



const photoStyle1 : ImageStyle = {
  height: 100,
  width: 100,
  borderRadius:70,
  marginBottom:8,
}
const photoStyle2 : ImageStyle = {
  height: 120,
  width: 120,
  borderRadius:70,
  marginBottom:8,
}

export const PersonPage1 : PersonsPageProps = {
  setButtons: false,
  imageStyle: photoStyle1,
  CardContainerStyle: CardContainer1,
  ComponentType : "ProButton"
}

export const PersonPage2 : PersonsPageProps = {
  setButtons: true,
  imageStyle: photoStyle2,
  CardContainerStyle: CardContainer2,
  ComponentType : "Rating"
}

export const dataLocation = [
  { label: 'Haifa', value:'1' },
  { label: 'Nazareth', value: '2' },
  { label: 'Kfar yasif', value: '3' },
  { label: 'Nahareya', value: '4' },
  { label: 'Acre', value: '5' },
  { label: 'Elat', value: '6' },
  { label: 'Karmiel', value: '7' },
  { label: 'Ramla', value: '8' },

  
];



export  const dataProfessions1 = [
  { label: 'Contractor', value:'1' },
  { label: 'Worker', value: '2' },
 
]


export const sort = [
  {label : "Experience" , value : '1'},
  {label : "Rating" , value : '2'},
  {label : "Nearest" , value : '3'},
  {label : "Searches" , value : '4'}
]


export const dataProfessions2 = [
  { label: 'Carpetner', value:'1', uri : 'https://www.svgrepo.com/show/103746/carpenter.svg', component: CarpenterIcon },
  { label: 'Painter', value: '2', uri : 'https://www.svgrepo.com/show/366776/painter.svg' , component: PainterIcon},
  { label: 'Constructor', value: '3', uri : 'https://www.svgrepo.com/show/65391/constructor-with-hard-hat-protection-on-his-head.svg', component: ConstructorIcon},
  { label: 'Electrical', value: '4', uri : 'https://www.svgrepo.com/show/308571/electrical-repair-kit.svg', component: ElectricianIcon },
  { label: 'Security', value: '5', uri : 'https://www.svgrepo.com/show/449417/security-camera.svg', component: ElectricianIcon },
  { label: 'Gardner', value: '6' , uri : 'https://www.svgrepo.com/show/393289/garden-centre.svg', component: GardenerIcon },
]


export const articles = [{title : "11 Construction Industry Trends for 2020 – Bigrentz" , description : "After a turbulent period of adjusting forecasts and changing expectations, 2022 will be a year of reemergence and growth in the construction industry. Rising construction costs and labor shortages persist, challenging the industry to innovate competitive new ideas, while stricter regulations contribute to a reduced margin for error and waste." , date : "November 28, 2023" , author : "BigRentz", ref : "https://www.bigrentz.com/blog/construction-trends", imageuri : "https://acropolis-wp-content-uploads.s3.us-west-1.amazonaws.com/what-is-a-submittal-hero.webp"}, 


{title : "Economists Make 2020 Construction Predictions" , description : "The transportation infrastructure market is expected to grow at least 5 percent next year, according the American Road & Transportation Builders Association. Increased transportation investments from federal, state, and local governments are helping to grow the sector." , date : "JANUARY 06, 2020" , author : "LUCY PERRY", ref : "https://www.constructionequipmentguide.com/economists-make-2020-construction-predictions/46986", imageuri : "https://dmt55mxnkgbz2.cloudfront.net/800x0_s3-46986-MNSW-413_19-LP-1.jpg"}, {title : "What contractors need to know for 2024", description : "As the new year begins, construction pros across the country face a range of challenges and opportunities. Amid the continuing labor shortage and high interest rates, it’s anyone’s guess what will happen in 2024, but Construction Dive has the insights and information that can help bring the year into focus.", date : "Jan. 25, 2024" , author : "Dive Staff" , ref : "https://www.constructiondive.com/news/construction-trends-outlook-2024/705471/" , imageuri : "https://www.constructiondive.com/imgproxy/gyNNaNMZZRktXQuUy2hdHkbxkVK4JGBpfN39BqK6Vhs/g:ce/rs:fill:800:450:1/bG9jYWw6Ly8vZGl2ZWltYWdlL0dldHR5SW1hZ2VzLTEzMzQxMzgyNjkuanBn.webp"}]



export const popularProfessions = [ 
  { profession: "Carpenter", number: 50, component: CarpenterIcon },
  { profession: "Electrical", number: 20, component: ElectricianIcon },
  { profession: "Constructor", number: 30, component: ConstructorIcon },
  { profession: "Painter", number: 40, component: PainterIcon },
  { profession: "Plumber", number: 70, component: PlumberIcon },
  { profession: "Air Conditioner", number: 20, component: AirConditioningIcon },
  { profession: "Gardener", number: 5, component: GardenerIcon },
];



export const RequestTypes = [
  {label : "Job offer", value : 1},
  {label : "Job Apply", value : 2}
]

export interface IMessage {
  _id: string | number
  text: string
  createdAt: Date | number
  user: User
  image?: string
  video?: string
  audio?: string
  system?: boolean
  sent?: boolean
  received?: boolean
  pending?: boolean
  quickReplies?: QuickReplies
}

export interface Reply {
  title: string
  value: string
  messageId?: any
}

export interface QuickReplies {
  type: 'radio' | 'checkbox'
  values: Reply[]
  keepIt?: boolean
}

export let ChatFriendsNumber=0