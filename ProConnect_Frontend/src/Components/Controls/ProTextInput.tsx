import {Text, TextInput, StyleSheet, Platform, Animated} from 'react-native';
import {Control, Controller, RegisterOptions } from 'react-hook-form';
import { Colors, View } from 'react-native-ui-lib';
import { customWidthValues } from '../../Constants/Values';


interface InputProps{
    control: Control,
    name: string,
    placeholder: string,
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>,
    secureTextEntry?: boolean,
    webWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
    mobileWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined
    spellCheck?: boolean,
    flexShrink?: boolean,
    marginR?: number,
    marginL?: number,
}

const ProTextInput: React.FC<InputProps> = (props) => {
  const isWeb = Platform.OS === 'web';
  const width = customWidthValues(props.webWidth, props.mobileWidth);
  const flexShrink = props.flexShrink || false;
  return (
    <Controller
      control={props.control} defaultValue={''}
      name={props.name}
      rules={props.rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
        <View style={{width: width, marginRight: props.marginR, marginLeft: props.marginL, backgroundColor: 'transparent'}} flexS={flexShrink}>

          <View
            style={[
              styles.container,
              {borderColor: error ?  Colors.failure : '#e8e8e8'}
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={props.placeholder}
              style={[styles.input, (isWeb ? {outlineStyle: 'none'}: {})]}
              secureTextEntry={props.secureTextEntry || false}
              autoCapitalize={props.autoCapitalize}
              spellCheck={props.spellCheck || false}
              />
          </View>
            <Text style={{color: Colors.failure, alignSelf: 'stretch'}}>{error?.message || ' '}</Text>
          </View>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: 45,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: '100%',
     width: '100%',     
  },
});

export default ProTextInput;