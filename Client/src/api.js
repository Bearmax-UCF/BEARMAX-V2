import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

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

        return response.data;

    }

    catch(error) {

        console.log("loginApi: error: ");
        console.log(error);
        throw error.response.data;

    }

}//End of loginFuncApi



export async function verifyEmailApi(credentials) {
    try {

        const response = await axios.get('api/auth/verify?token=&id=');

        return response.data;

    }
    
    catch (error) {

        throw error.response.data;

    }
    
}//End of verifyEmailApi function


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

        throw error.response.data;

    }

}//End of forgotPasswordApi function


export async function resetPasswordApi(data) {
    try {

      const response = await axios.post('api/auth/resetPassword', data);
      return response.data;

    } 
    
    catch (error) {

      throw error.response.data;

    }

  }//End of resetPasswordApi function



