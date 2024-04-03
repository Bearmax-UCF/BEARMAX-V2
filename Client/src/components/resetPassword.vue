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


    export default {

        setup() {

            const newPassword = ref();

            const passwordResetError = ref(null);

            const passwordReset = async() => {

                try {

                    

                }

                catch(error) {

                    console.log(error.message);
                }



            }//End of passwordReset function



            return {

                passwordReset,
                passwordResetError,
                newPassword,

            }


        }//End of setup

    }//End export default

</script>

