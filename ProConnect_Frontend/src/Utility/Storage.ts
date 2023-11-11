import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeSimpleData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, String(value));
    } catch (e) {
      // saving error
    }
  };

  export const storeJsonData = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  export const getSimpleData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      return null;
    }
  };

  export const getJsonData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  export const clearData = async()=>{
    await AsyncStorage.clear();
  }