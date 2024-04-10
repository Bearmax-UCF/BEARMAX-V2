<template>

    <router-link to="/forgotpassword" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>





    <input type="password" class="textField" placeholder="New Password" v-model="newPassword"/>

    <br><br>

    <button class = "button2" @click="passwordReset">

        Reset Password

    </button>



    <br><br>

    <p v-if="passwordResetError" style="color: red;">{{ passwordResetError }}</p>

    <!-- <p>New password is: {{ newPassword }}</p> -->

</template>



<script>

    import { ref } from 'vue';
    import { resetPasswordApi } from '@/api';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { useRouter } from 'vue-router';



    export default {

        setup() {

            const router = useRouter();


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

                    router.push('/homepage');

                    
                }

                catch(error) {

                    passwordResetError.value = error.message || 'An error occured.';
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

<style>

.button2{

color:white;
width:250px;
height:30px;
background-color: darkgreen;
font-size:22px;
font-family:Arial, Helvetica, sans-serif;
text-align: center;
border-radius: 10px;

transition: background-color 1s;

}

.button2:hover {

    background-color:goldenrod;
}

.button2:focus, .button:active{

    background-color: black;
    transition: none;

}



</style>