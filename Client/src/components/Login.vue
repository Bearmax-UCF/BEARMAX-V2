<template>

    <img src="../assets/bearmaxlogo.png" height=210px width="210px">

    <br><br><br>

    <h1 :style="{color:'forestgreen', fontWeight:'bold'}">Welcome to Bearmax!</h1>

    <br><br><br>

    <div>

        <input type="text" class="textField" placeholder="Email" v-model="userData.email"/>

        <br>
        
        <input type="password" class="textField" placeholder="Password" v-model="userData.password"/>

        <br>

        <div>
        
            <p>
                Forgot password? 

                <router-link to="/forgotpassword">
                    Click here.
                </router-link>

            </p>
        </div>

    </div>


    <div>


            <button @click="login" class="button">
                Login

            </button>

            <p v-if="loginError" style="color: red;">{{ loginError }}</p>



    </div>



    <br><br><br> <br><br><br> <br><br>

    <div>

        <p> Don't have an account? 
    
        <router-link to="/signup">
        
            Sign up here.

        </router-link>

        </p>

   </div>

</template>


<script>

import { useRouter} from 'vue-router';
import { ref } from 'vue';
import { loginApi } from '@/api';




export default{

    setup() {

        const router = useRouter();

        const userData = ref( {

            email: '',
            password: ''
        });


        const loginError = ref(null);

        const login = async () => {

        try{

           await(loginApi(userData.value));
           router.push('./homepage');
            

        }

            catch (error) {
                loginError.value = error.message || 'An error occured.';
            }
        }

        return {
            userData,
            login,
            loginError
        };

    },


  

}





   

</script>


<style>

body{
background:#ffebcd;
}


.button{

color:white;
width:90px;
height:30px;
background-color: darkgreen;
font-size:22px;
font-family:Arial, Helvetica, sans-serif;
text-align: center;
border-radius: 10px;

transition: background-color 1s;

}

.button:hover {

    background-color:goldenrod;
}

.button:focus, .button:active{

    background-color: black;
    transition: none;

}

.textField {

    font-size:15px;
    height: 50px;
    width: 200px;
    border-radius:5px;
    text-align:right;
}



</style>