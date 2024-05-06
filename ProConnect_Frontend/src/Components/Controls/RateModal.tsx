import { View, Modal, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { TouchableOpacity } from 'react-native';
import ProHeader, { HeaderType } from '../Layout/ProHeader';
import ProLoading from '../Layout/ProLoading';

interface RateModalProps {
    onClose: () => void;
    onRate: (rating: number) => void;
    initialRating?: number;
    isVisible: boolean;
    title?: string;
    isDisabled: boolean;
}

const RateModal: React.FC<RateModalProps> = ({ onClose, onRate, initialRating, isVisible, title, isDisabled }) => {
    const handleRating = (rating: number) => {
        onRate(rating);
        onClose();
    };
    if(isVisible === false) return (<></>);
    return (
        <TouchableOpacity style={{position: 'absolute', zIndex: 10, width: "100%", height: "100%"}} activeOpacity={1} onPress={()=>{onClose()}}>

            <View style={{ width: 300, height: 150, zIndex: 10, alignSelf: 'center', borderRadius: 15 }}>
                <TouchableOpacity delayPressIn={0} delayPressOut={0} onPress={(e)=>{e.preventDefault()}} activeOpacity={1}>

                <View style={styles.container}>
                    <ProHeader color='black' text={title || 'Rate User'} headerType={HeaderType.H3} marginT-0 marginB-30/>
                    <AirbnbRating
                    isDisabled={isDisabled}
                        count={5}
                        showRating={false}
                        defaultRating={initialRating || 0}
                        onFinishRating={handleRating}
                        />
                        {isDisabled && <ProLoading small displayLoadingMessage loadingMessage='Saving rating...'/>}
                </View>
                        </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default RateModal;
const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        top: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: "space-between",
        backgroundColor: 'white',
        shadowColor: '#000000ff',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 100,
        padding: 45
    }
});