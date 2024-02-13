import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL,
});


export async function registerUser(userData : {email: string; firstName: string; lastName: string; password: string}) {

    console.log("email: ");
    console.log(userData.email);

    console.log("firstName: ");
    console.log(userData.firstName);

    console.log("lastName: ");
    console.log(userData.lastName);

    console.log("password: ");
    console.log(userData.password);


    try{

        const response = await api.post('/auth/register', userData);

        console.log("response: ");
        console.log(response);

        // const response = await api.post('/auth/register', email, firstName, lastName, password);

        return response.data;
    }

    catch(error) {
        throw error;
    }
}//end of registerUser function

export async function forgotPassword(userData: {email: String}){

    console.log("email: ");
    console.log(userData.email);

    try{

        //console.log("before await api.post()");
        const response = await api.post('/auth/forgotPasswordRequest', userData);

        console.log("response: ");
        console.log(response);


        return response.data;
    }

    catch(error) {
        throw error;
    }

}//End of forgotPassword function

export async function loginFunc(userData: {email: String, password: String}){

    console.log("email: ");
    console.log(userData.email);

    console.log("password: ");
    console.log(userData.password);

    try{

        //console.log("before await api.post()");
        const response = await api.post('/auth/login', userData);

        console.log("response: ");
        console.log(response);


        return response.data;
    }

    catch(error) {
        throw error;
    }

}//End of loginFunc





