import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setInStorage(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error(error);
    }
}

export async function getFromStorage(key) {
    try {
        let toReturn = await AsyncStorage.getItem(key);
        if (toReturn) {
            return toReturn;
        } else {
            console.log("No local storage")
        }
    } catch (error) {
        console.error(error);
    }
}
