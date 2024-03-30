import axios from 'axios';
import Cookies from 'js-cookie';


// To hold the base URL whether it is in development or production
const baseURL = process.env.BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL,
});


export async function registerUserApi(userData) {
    console.log("email: ");
    console.log(userData.email);

    console.log("firstName: ");
    console.log(userData.firstName);

    console.log("lastName: ");
    console.log(userData.lastName);

    console.log("password: ");
    console.log(userData.password);


    try{

        console.log("before calling auth/register(userData) inside registerUserApi function userData: " + userData);

        const response = await api.post('/auth/register', userData);

        console.log("response: ");
        console.log(response);

        // const response = await api.post('/auth/register', email, firstName, lastName, password);

        return response.data;

    }

    catch(error) {

        console.log("inside registerUserApi function, catch(error) response data is: ");
        console.log(error);
        throw error.response.data;

    }

}//end of registerUserApi function


export async function loginApi(loginInfo){

    console.log("email: ");
    console.log(loginInfo.email);

    console.log("password: ");
    console.log(loginInfo.password);

    try{

        //console.log("before await api.post()");
        const response = await api.post('/auth/login', loginInfo);

        console.log("response: ");
        console.log(response);

        console.log("auth_token from cookie");

        Cookies.set("auth_token", response.data.token, {expires:1 });
        console.log(Cookies.get("auth_token"));

     

        return response.data;

    }

    catch(error) {

        console.log("loginApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of loginFuncApi


export async function forgotPasswordApi(userData){

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

        console.log("forgotPasswordApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of forgotPasswordApi function

export async function getAllNotesApi(){

    try{

        //console.log("before await api.post()");
        const response = await api.get('/note', {headers: {

            Authorization: 'Bearer ' + Cookies.get("auth_token")
        }

        });
        


        console.log("response: ");
        console.log(response);

        return response.data;

    }

    catch(error) {

        console.log("getAllNotesApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of getAllNotesApi


export async function createNoteApi(userData){

    try{

        //console.log("before await api.post()");
        const response = await api.post('/note', userData, {headers: {

            Authorization: 'Bearer ' + Cookies.get("auth_token")
        }

        });
        
        console.log("response: ");
        console.log(response);

        return response.data;

    }

    catch(error) {

        console.log("createNoteApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of createNoteApi


export async function editNoteApi(userData, noteId){

    try{

        const editUrl = '/note/' + noteId;

        console.log("editNoteApi url is: ");
        console.log(editUrl);

        console.log("userData is: ");
        console.log(userData);

        const response = await api.patch(editUrl, userData, {headers: {

            Authorization: 'Bearer ' + Cookies.get("auth_token")
        }

        });
        
        console.log("response: ");
        console.log(response);

        return response.data;

    }

    catch(error) {

        console.log("editNoteApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of editNoteApi

export async function deleteNoteApi(noteId){

    try{

        const deleteUrl = '/note/' + noteId;

        console.log("deleteNoteApi url is: ");
        console.log(deleteUrl);

        const response = await api.delete(deleteUrl, {headers: {

            Authorization: 'Bearer ' + Cookies.get("auth_token")
        }

        });
        
        console.log("response: ");
        console.log(response);

        return response.data;

    }

    catch(error) {

        console.log("deleteNoteApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of deleteNoteApi


export async function getUserInfoApi(){

    try{

        //console.log("before await api.post()");
        const response = await api.get('/users/me', {headers: {

            Authorization: 'Bearer ' + Cookies.get("auth_token")
        }

        });
        
        console.log("response: ");
        console.log(response);

        return response.data;

    }

    catch(error) {

        console.log("getUserInfoApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of getUserInfoApi function


export async function saveUserChangesApi(userData, userId){

    try{

        const saveChangesUrl = '/users/' + userId;

        console.log("in saveUserChangesApi");
        console.log("user data: ");
        console.log(userData);
        console.log("user id: ");
        console.log(userId);
        //console.log("before await api.post()");
        const response = await api.patch(saveChangesUrl, userData, {headers: {

            Authorization: 'Bearer ' + Cookies.get("auth_token")
        }

        });
        
        console.log("response: ");
        console.log(response);

        return response.data;

    }//End of try block

    catch(error) {

        console.log("saveUserChangesApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of saveUserChangesApi function


export async function deleteUserApi(userId){

    try{

        const deleteUserUrl = '/users/' + userId;

        const response = await api.delete(deleteUserUrl, {headers: {

            Authorization: 'Bearer ' + Cookies.get("auth_token")
        }

        });
        
        console.log("response: ");
        console.log(response);

        return response.data;

    }

    catch(error) {

        console.log("deleteUserApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of deleteUserApi function

export async function getEmotionRecognitionDataApi(){

    try{

        console.log("inside getEmotionRecognitionDataApi function");

        console.log("baseURL is: " + baseURL);

        //console.log("before await api.post()");
        const response = await api.get('/emotionRecognition', {headers: {

            Authorization: 'Bearer ' + Cookies.get("auth_token")
        }

        });

        console.log("after getEmotionRecognitionDataApi call");


        console.log("response: ");
        console.log(response);

        console.log("end of getEmotionRecognitionDataApi try block (right before return response.data)");


        return response.data;

    }

    catch(error) {

        console.log("getEmotionRecognitionDataApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of getEmotionRecognitionDataApi


export async function saveEmotionRecognitionDataApi(){

    const gameData = {

        Correct: [1,2], 
        Wrong: [1,1],
        NumPlays: 2,
        
    }

        try {
            //console.log("before await api.post()");
            const response = await api.post('/emotionRecognition', gameData, {headers: {

                Authorization: 'Bearer ' + Cookies.get("auth_token")
            }

            });
            
            console.log("response: ");
            console.log(response);

            return response.data;
        }

        catch(error) {

            console.log("saveEmotionRecognitionDataApi: error: ");
            console.log(error);
            throw error.response.data;

        }


}//End of export saveEmotionRecognitionDataApi function






// export async function resetPasswordApi(data) {
//     try {

//       const response = await axios.post('api/auth/resetPassword', data);
//       return response.data;

//     } 
    
//     catch (error) {

//       throw error.response.data;

//     }

//   }//End of resetPasswordApi function



