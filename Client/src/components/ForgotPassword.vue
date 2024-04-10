<template>
    
    <router-link to="/settings" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>


    <h1>Input your email</h1>

    <br>

    <input type="text" class="textField" placeholder="Email" v-model="userData.email"/>

    <br><br>


    <button class = "button3" @click="forgotPassFunc">
                Send password reset request

    </button>


    <p v-if="passwordRequestError" style="color: red;">{{ passwordRequestError }}</p>


    <img src="../assets/newbearmaxlogo.png" height=200px width="200px" style="position:absolute; bottom: -5%; left:45%;">

</template>

<script>

import { ref } from 'vue';
import { forgotPasswordApi } from '@/api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';



    export default {

        setup() {

            const userData = ref( {

                email: '',
                
            });


            const passwordRequestError = ref(null);


            const forgotPassFunc = async () => {

            try{

                await forgotPasswordApi(userData.value);

                
            }

                catch (error) {
                    passwordRequestError.value = error.message || 'An error occured.';
                }
            }

            return {
                userData,
                forgotPassFunc,
                passwordRequestError
            };

        }
        
    }//End of export default

</script>

<style>

.button3{

color:white;
width:350px;
height:30px;
background-color: darkgreen;
font-size:22px;
font-family:Arial, Helvetica, sans-serif;
text-align: center;
border-radius: 10px;

transition: background-color 1s;

}

.button3:hover {

    background-color:goldenrod;
}

.button3:focus, .button:active{

    background-color: black;
    transition: none;

}





    
</style>