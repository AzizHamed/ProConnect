import React, { useState } from "react";
import {
  Text,
  Colors,
  View,
  TextField,
  TextFieldProps,
} from "react-native-ui-lib";
import { calculateResponsiveWidth, useViewport } from "../../Hooks/useViewPort";

interface ProTextFieldProps {
  label?: string;
  placeholder?: string;
  hint?: string;
  isResponsive?: boolean;
  setInput: (input: string, isValid: boolean) => void
}

const ProTextField: React.FC<ProTextFieldProps & TextFieldProps> = (props) => {
  const label = props.label || "Label";
  const hint = props.hint || "";
  const placeholder = props.placeholder || "Placeholder";
  const isResponsive = props.isResponsive || false;
  const setInput = props.setInput || (()=>{});
  
  let isValid: boolean = false;

  function onChangeText(value: string) {
    setInput(value, isValid);
  }

  return (
    <View margin-20 backgroundColor={Colors.transparent} style={{alignItems:"stretch"}}>
      <Text color={Colors.textPrimary} style={{transform:[{translateY:8}]}}>{label}</Text>
      <TextField
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        onChangeText={onChangeText}
        // containerStyle={{ backgroundColor: Colors.red1, paddingTop: 10, paddingStart: 10, borderRadius: 10, height: 100, minHeight:100 }}
        // fieldStyle={{backgroundColor:Colors.yellow1, transform:[{rotateZ:"25deg"}, {translateY:100}], borderWidth:5}}
        color={Colors.textPrimary}
        enableErrors
        validateOnBlur
        validationMessageStyle={{ color: Colors.failure, backgroundColor: Colors.success }}
        hint={hint}
        validationMessagePosition="bottom"
        validate={["required", "email", (value: string) => value.length > 6]}
        validationMessage={[
          "Field is required",
          "Email is invalid",
          "Password is too short",
        ]}
        onChangeValidity={validity => isValid = validity}
        maxLength={30}
      />
    </View>
  );
};

export default ProTextField;
