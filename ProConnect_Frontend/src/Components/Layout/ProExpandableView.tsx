import { LayoutAnimation, Platform, UIManager, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, Colors } from 'react-native-ui-lib';
import { IS_WEB, defaultWidthValues } from '../../Constants/Values';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Easing } from 'react-native-reanimated';

interface ProExpandableViewProps {
  title: string;
  children: React.ReactNode;
  height: number;
  isInitiallyExpanded?: boolean;
}

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ProExpandableView = ({ title, children, height, isInitiallyExpanded }: ProExpandableViewProps) => {
  const [expanded, setExpanded] = useState(isInitiallyExpanded || false);
  const [animation] = useState(new Animated.Value(isInitiallyExpanded ? 1 : 0));
  const width = defaultWidthValues();
  const isWeb = IS_WEB();
  console.log(width)
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expanded]);

  const handleTitleClick = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 175,
      useNativeDriver: false,
      easing: Easing.ease
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
    <View invisible width={width} style={{borderWidth: 1, borderRadius: 5, marginVertical: 10, borderColor: expanded ? Colors.radioColorSelected : Colors.radioColorDeselected}}>
      <TouchableOpacity onPress={handleTitleClick}>
        <View row spread invisible center marginH-10>            
            <Text h4 style={{fontWeight: 'bold', marginBottom: expanded ? 20 : 0, textAlign: 'left', width: "90%"}}>{title}</Text>
            <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={30} color={Colors.textPrimary} style={{alignSelf: 'center', marginBottom: expanded ? 10 : 0}} />
        </View>
      </TouchableOpacity>
      {expanded && <View height={1} style={{transform:[{translateY:-10}]}}></View>}
      <Animated.View style={[containerStyle, contentStyle, {marginTop: 20}, isWeb ? {width: width} : {} ]}>{children}</Animated.View>
    </View>
  );
};

export default ProExpandableView;