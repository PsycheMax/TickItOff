import axios from 'axios';
import dotEnv from "../.env.js";

const APIDestination = dotEnv.API_SERVER;

// TODO I can change this, make it get the ACCESS TOKEN from the context

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
    console.log("PROJECT PATCH");
    console.log(APIDestination + pathDestination)
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
export async function axiosDelete(pathDestination, accessToken) {
    try {
        const configuration = {
            method: 'delete',
            url: APIDestination + pathDestination,
            headers: {
                'x-access-token': accessToken
            },
        }
        const response = await axios(configuration);
        return response;
    }
    catch (error) {
        return error.response;
    }
}