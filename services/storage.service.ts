import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (value: any, keystore: string) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(keystore, jsonValue)
    } catch (e) {
        // saving error
    }
}

const getItem = async (keystore: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(keystore)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}

const removeItem = (keystore: string) =>{
    AsyncStorage.removeItem(keystore);
}

const removeAllItems = () =>{
    AsyncStorage.clear();
}

export const AsyncStorageService = {setItem, getItem, removeItem, removeAllItems}
