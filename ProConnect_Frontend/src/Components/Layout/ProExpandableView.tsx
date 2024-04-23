import { LayoutAnimation, Platform, UIManager, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, Colors } from 'react-native-ui-lib';
import { defaultWidthValues } from '../../Constants/Values';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ProExpandableViewProps {
  title: string;
  children: React.ReactNode;
  height: number;
}

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ProExpandableView = ({ title, children, height }: ProExpandableViewProps) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const width = defaultWidthValues();

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expanded]);

  const handleTitleClick = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const containerStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height],
    }),
  };

  const contentStyle = {
    opacity: animation,
  };

  return (
    <View width={width} invisible>
      <TouchableOpacity onPress={handleTitleClick}>
        <View row spread invisible>            
            <Text h4 style={{fontWeight: 'bold', marginBottom: expanded ? 20 : 0, textAlign: 'left'}}>{title}</Text>
            <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={30} color={Colors.textPrimary} style={{alignSelf: 'center', marginBottom: expanded ? 10 : 0}} />
        </View>
      </TouchableOpacity>
      <Animated.View style={[containerStyle, contentStyle, {marginTop: 20}]}>{children}</Animated.View>
      <View height={1} style={{transform:[{translateY:-10}]}}></View>
    </View>
  );
};

export default ProExpandableView;