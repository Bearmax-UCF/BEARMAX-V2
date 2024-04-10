<template>

    <button @click="passwordReset">

        Reset Password

    </button>

    <br><br>

    <input type="password" class="textField" placeholder="New Password" v-model="newPassword"/>

    <br><br>


    <p>New password is: {{ newPassword }}</p>

</template>



<script>

    import { ref } from 'vue';
    import { resetPasswordApi } from '@/api';
 


    export default {

        setup() {

            const newPassword = ref();

            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            const id = urlParams.get('id');


            const userData = ref ({

                token: '',
                id: '',
                password: '',
            });

            const passwordResetError = ref(null);

            const passwordReset = async() => {

                try {

                    console.log("reset password token is: " + token);
                    console.log("reset password id is: " + id);


                    userData.value.token = token;
                    userData.value.id = id;
                    userData.value.password = newPassword;

                    console.log("userData.value is " + userData.value);

                    const response = await resetPasswordApi({token:token, id:id, password:newPassword.value});
                    console.log("response is " + response);

                    
                }

                catch(error) {

                    console.log(error.message);
                }


            }//End of passwordReset function



            return {

                passwordReset,
                passwordResetError,
                newPassword,
                userData,
                token,
                id,
                newPassword,


            }


        }//End of setup

    }//End export default

</script>

