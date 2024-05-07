import { Image, ImageStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { User } from '../../Services/Redux/Api';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../Services/Redux/Slices/UserSlice';

interface ProfileImageProps {
    size?: number;
    imageStyle?: ImageStyle;
    user: User;
    overrideUrl?: string;
    navigateToProfileDisabled?: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = (props) => {
    const user = props.user;
    const photoUrl = user.photoUrl;
    const imageSource = (props.overrideUrl && props.overrideUrl !== '') ? { uri: props.overrideUrl } :
    { uri: (photoUrl !== undefined && photoUrl !== null && photoUrl !== '') ? photoUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png' };
    const size = props.size || 130;
    const style = props.imageStyle || { height: size, width: size, borderRadius: size / 2 }
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <TouchableOpacity onPress={()=>{
            if(props.navigateToProfileDisabled) return;
            dispatch(selectUser(user));
            navigation.navigate('Profile');
        }}>
        <Image 
            source={imageSource}
            style={style}
            
            />
        </TouchableOpacity>
    )
}

export default ProfileImage