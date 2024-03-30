<template>
    
    <h1>Input your email</h1>

    <br>

    <input type="text" class="textField" placeholder="Email" v-model="userData.email"/>

    <br><br>


    <button @click="forgotPassFunc" width="180px">
                Send password reset request

    </button>


    <p v-if="passwordRequestError" style="color: red;">{{ passwordRequestError }}</p>


</template>

<script>

import { ref } from 'vue';
import { forgotPasswordApi } from '@/api';


    export default {

        setup() {

            const userData = ref( {

                email: ''
                
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