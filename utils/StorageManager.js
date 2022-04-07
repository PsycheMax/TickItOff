import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setInStorage(key, value) {
    try {
        let parsedValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, parsedValue);
        console.log("SET CORRECT");
        return { [key]: parsedValue };
    } catch (error) {
        console.error(error);
    }
}

export async function getFromStorage(key) {
    try {
        let rawStorageData = await AsyncStorage.getItem(key);
        if (rawStorageData) {
            console.log(rawStorageData);
            let toReturn = JSON.parse(rawStorageData);
            console.log(toReturn);
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