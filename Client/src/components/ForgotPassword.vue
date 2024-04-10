<template>
    
    <router-link to="/settings" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>


    <h1>Input your email</h1>

    <br>

    <input type="text" class="textField" placeholder="Email" v-model="userData.email"/>

    <br><br>


    <button @click="forgotPassFunc" width="180px">
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
    
</style>