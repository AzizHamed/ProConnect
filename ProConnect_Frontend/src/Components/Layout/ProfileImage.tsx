import { Image } from 'react-native'
import React from 'react'

interface ProfileImageProps {
    size?: number;
    photoUrl?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = (props) => {
    const imageSource = { uri: (props.photoUrl !== undefined && props.photoUrl !== null && props.photoUrl !== '') ? props.photoUrl : 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png' };
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