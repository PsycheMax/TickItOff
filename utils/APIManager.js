import axios from 'axios';
import dotEnv from "../.env.js";

const APIDestination = dotEnv.API_SERVER;

export async function axiosGet(pathDestination) {
    try {
        return await axios.get(`${APIDestination}${pathDestination}`, {});
    }
    catch (error) {
        return error.response.data;
    }
}
export async function axiosPost(pathDestination, objectToSend) {
    try {
        return await axios.post(`${APIDestination}${pathDestination}`, objectToSend);
    }
    catch (error) {
        return error.response.data;
    }
}
export async function axiosPatch(pathDestination, objectToSend) {
    try {
        return await axios.patch(`${APIDestination}${pathDestination}`, objectToSend);
    }
    catch (error) {
        return error.response.data;
    }
}
export async function axiosDelete(pathDestination, objectToSend) {
    try {
        return await axios.delete(`${APIDestination}${pathDestination}`, objectToSend);
    }
    catch (error) {
        return error.response.data;
    }
}