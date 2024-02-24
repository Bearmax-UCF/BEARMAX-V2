<template>


    <h1>Email Verification</h1>

    <br><br>

    <!-- <form @submit.prevent="verifyEmail">

      <label>Token:</label> -->

      <input type="text" class = "textField" v-model="credentials.token" placeholder="Token">

      <br><br>
      
      <!-- <label>User ID:</label> -->

      <input type="text" class = "textField" v-model="credentials.userId" placeholder="User ID">

      <br><br>
      
      <button @click="verifyEmail"> Verify Email </button>

    <!-- </form> -->

    <p v-if="emailVerificationError" style="color : red">{{ emailVerificationError }}</p>


</template>




<script>

    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { verifyEmailApi } from '@/api';

    export default {

        setup() {

            const router = useRouter();

            const credentials = ref( {

                token: '',
                userId: '',
            });


            const emailVerificationError = ref(null);

            const verifyEmail = async () => {

            try{

                await verifyEmailApi(credentials.value);

                // console.log('Successfully registered.');

                router.push('./login');
            }

                catch (error) {
                    emailVerificationError.value = error.message || 'An error occured.';
                }
            }

            return {
                credentials,
                verifyEmail,
                emailVerificationError
            };

        },

    }
   

</script>


<style>

    

</style>



