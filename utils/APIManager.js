import axios from 'axios';
import dotEnv from "../.env.js";

const APIDestination = dotEnv.API_SERVER;

export async function axiosGet(pathDestination, accessToken) {
    try {
        const configuration = {
            method: 'get',
            url: APIDestination + pathDestination,
            headers: {
                'x-access-token': accessToken
            }
        }
        const response = await axios(configuration);
        return response;
    }
    catch (error) {
        return error.response;
    }
}
export async function axiosPost(pathDestination, objectToSend, accessToken) {
    try {
        const configuration = {
            method: 'post',
            url: APIDestination + pathDestination,
            headers: {
                'x-access-token': accessToken
            },
            data: objectToSend
        }
        const response = await axios(configuration);
        return response;
    }
    catch (error) {
        return error.response;
    }
}
export async function axiosPatch(pathDestination, objectToSend, accessToken) {
    try {
        const configuration = {
            method: 'patch',
            url: APIDestination + pathDestination,
            headers: {
                'x-access-token': accessToken
            },
            data: objectToSend
        }
        const response = await axios(configuration);
        return response;
    }
    catch (error) {
        return error.response;
    }
}
export async function axiosDelete(pathDestination, objectToSend, accessToken) {
    try {
        const configuration = {
            method: 'delete',
            url: APIDestination + pathDestination,
            headers: {
                'x-access-token': accessToken
            },
            data: objectToSend
        }
        const response = await axios(configuration);
        return response;
    }
    catch (error) {
        return error.response;
    }
}