<template>
    
    <h1>Enter your new password</h1>

    <br>

    <input type="text" class="textField" placeholder="new password" v-model="userData.email"/>

    <br><br>

    <button @click="newPassFunc" width="180px">
                Set new password

    </button>


</template>

<script>

import { ref } from 'vue';
import { forgotPassword } from '@/api';

    export default {

        setup() {

            const userData = ref( {

                email: ''
                
            });


            const passwordRequestError = ref(null);

            const forgotPassFunc = async () => {

            try{

                await forgotPassword(userData.value);

                
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