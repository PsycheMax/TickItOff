import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setInStorage(key, value) {
    try {
        let parsedValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, parsedValue);
        return { [key]: parsedValue };
    } catch (error) {
        console.error(error);
    }
}

export async function getFromStorage(key) {
    try {
        let rawStorageData = await AsyncStorage.getItem(key);
        if (rawStorageData) {
            let toReturn = JSON.parse(rawStorageData);
            return toReturn;
        } else {
            console.log("No local storage");
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function removeStorage(key) {
    try {
        AsyncStorage.removeItem(key, (error) => {
            if (error) {
                console.log(error);
                AsyncStorage.clear((error) => {
                    console.log(error);
                });
            }
        })
    } catch (error) {
        console.log("Error in Storage Management");
        console.log(error);
    }
}