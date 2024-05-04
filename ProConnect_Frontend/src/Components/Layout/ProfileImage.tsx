import { Image } from 'react-native'
import React from 'react'

interface ProfileImageProps {
    size?: number;
    photoUrl?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = (props) => {
    const imageSource = { uri: (props.photoUrl !== undefined && props.photoUrl !== null && props.photoUrl !== '') ? props.photoUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png' };
    const size = props.size || 130;
    return (
        <Image 
            source={imageSource}
            style={{
                height: size,
                width: size,
                borderRadius: size/2,
            }}
        />
    )
}

export default ProfileImage