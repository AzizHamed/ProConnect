import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Colors, Text } from 'react-native-ui-lib';
import { Ionicons, MaterialIcons, AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, MaterialCommunityIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

interface ProIconButtonProps {
    onPress: () => void;
    showAddIcon?: boolean;
    disabled?: boolean;

    materialIcon?: boolean;
    materialIconName?: keyof typeof MaterialIcons.glyphMap;
    ionicon?: boolean;
    ioniconName?: keyof typeof Ionicons.glyphMap;
    antDesign?: boolean;
    antDesignName?: keyof typeof AntDesign.glyphMap;
    entypo?: boolean;
    entypoName?: keyof typeof Entypo.glyphMap;
    evilIcons?: boolean;
    evilIconsName?: keyof typeof EvilIcons.glyphMap;
    feather?: boolean;
    featherName?: keyof typeof Feather.glyphMap;
    fontAwesome?: boolean;
    fontAwesomeName?: keyof typeof FontAwesome.glyphMap;
    fontAwesome5?: boolean;
    fontAwesome5Name?: keyof typeof FontAwesome5.glyphMap;
    fontisto?: boolean;
    fontistoName?: keyof typeof Fontisto.glyphMap;
    foundation?: boolean;
    foundationName?: keyof typeof Foundation.glyphMap;
    materialCommunityIcons?: boolean;
    materialCommunityIconsName?: keyof typeof MaterialCommunityIcons.glyphMap;
    octicons?: boolean;
    octiconsName?: keyof typeof Octicons.glyphMap;
    simpleLineIcons?: boolean;
    simpleLineIconsName?: keyof typeof SimpleLineIcons.glyphMap;
    zocial?: boolean;
    zocialName?: keyof typeof Zocial.glyphMap;
  }
  
  const ProIconButton: React.FC<ProIconButtonProps> = (props) => {
    const disabled = props.disabled || false;
    let IconComponent, iconName;
    if(props.materialIcon){IconComponent = MaterialIcons; iconName = props.materialIconName;}
    else if(props.ionicon){IconComponent = Ionicons; iconName = props.ioniconName;}
    else if(props.antDesign){IconComponent = AntDesign; iconName = props.antDesignName;}
    else if(props.entypo){IconComponent = Entypo; iconName = props.entypoName;}
    else if(props.evilIcons){IconComponent = EvilIcons; iconName = props.evilIconsName;}
    else if(props.feather){IconComponent = Feather; iconName = props.featherName;}
    else if(props.fontAwesome){IconComponent = FontAwesome; iconName = props.fontAwesomeName;}
    else if(props.fontAwesome5){IconComponent = FontAwesome5; iconName = props.fontAwesome5Name;}
    else if(props.fontisto){IconComponent = Fontisto; iconName = props.fontistoName;}
    else if(props.foundation){IconComponent = Foundation; iconName = props.foundationName;}
    else if(props.materialCommunityIcons){IconComponent = MaterialCommunityIcons; iconName = props.materialCommunityIconsName;}
    else if(props.octicons){IconComponent = Octicons; iconName = props.octiconsName;}
    else if(props.simpleLineIcons){IconComponent = SimpleLineIcons; iconName = props.simpleLineIconsName;}
    else if(props.zocial){IconComponent = Zocial; iconName = props.zocialName;}
    else return <Text>Invalid Icon</Text>;


  return (
    <Button style={styles.button} round onPress={props.onPress} backgroundColor='transparent' disabledBackgroundColor='transparent'disabled={disabled}> 
      <IconComponent name={iconName} size={28} color={disabled ? Colors.$iconDisabled : Colors.textPrimary} />
      {props.showAddIcon && <MaterialIcons name="add-circle" size={14} color={disabled ? Colors.$iconDisabled : Colors.textPrimary} style={styles.plus}/>}
    </Button>
  );
};

const styles = StyleSheet.create({
    button:{
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    plus: {
        position: 'absolute',
        transform: [{translateX: 15}, {translateY: 12}]
    },
});

export default ProIconButton;