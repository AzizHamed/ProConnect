import {Text, TextInput, StyleSheet, Platform, Animated,  TextInputProps} from 'react-native';
import {Control, Controller, RegisterOptions } from 'react-hook-form';
import { Colors, View } from 'react-native-ui-lib';
import { customWidthValues } from '../../Constants/Values';
import React from 'react';

interface InputProps{
    control: Control,
    name: string,
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>,
    webWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode,
    mobileWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode,
    flexShrink?: boolean,
    marginR?: number,
    marginL?: number,
}

const ProTextInput = React.forwardRef<TextInput, InputProps & TextInputProps>(({control,
  name,
  rules,
  webWidth,
  mobileWidth,
  flexShrink,
  marginR,
  marginL,
  ...rest}, ref) => {
  const isWeb = Platform.OS === 'web';
  const width = customWidthValues(webWidth, mobileWidth);
  const flexShrinkValue = flexShrink || false;
  const height = rest.numberOfLines ? 45 * rest.numberOfLines : 45;
  const textAlignVertical = rest.numberOfLines ? 'top' : 'center'
  return ( 
    <Controller
      control={control} defaultValue={''}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
        <View style={{width: width, marginRight: marginR, marginLeft: marginL, backgroundColor: 'transparent'}} flexS={flexShrinkValue}>
          <View
            style={[
              styles.container,
              {borderColor: error ?  Colors.failure : '#e8e8e8', height: height,}
            ]}>
            <TextInput
              {...rest}
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={rest.placeholder}
              style={[styles.input, (isWeb ? {outlineStyle: 'none'}: {})]}
              blurOnSubmit={false}
              textAlignVertical={textAlignVertical}
              />
          </View>
            <Text style={{color: Colors.failure, alignSelf: 'stretch'}}>{error?.message || ' '}</Text>
          </View>
        </>
      )}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  input: {
    height: '100%',
     width: '100%',     
  },
});

export default ProTextInput;