<template>
    
    <h1 :style="{color:'forestgreen', fontWeight:'bold'}">Create Account</h1>



    <img src="../assets/bearmaxlogo.png" height=210px width="210px">


    <br><br><br>

    <div>

        <input type="text" class="textField" placeholder="Email" v-model="userData.email"/>

        <br>

        <input type="text" class="textField" placeholder="First Name" v-model="userData.firstName"/>

        <br>

        <input type="text" class="textField" placeholder="Last Name" v-model="userData.lastName"/>

        <br>

        <input type="password" class="textField" placeholder="Password" v-model="userData.password"/>

        <br>

        <!-- <input type="text" class="textField" placeholder="Repeat Password"/> -->

        <br>
        <br>

    </div>

    <div>

        <button @click="register" class="button" width="180px">
            Sign Up

        </button>

        <p v-if="registrationError" style="color: red;">{{ registrationError }}</p>

    </div>

    <div>
            
         <p>
            Already have an account?
            <router-link to="/login">
                Sign in here.
            </router-link>

        </p>

    </div>



</template>

<script>

    import { useRouter} from 'vue-router';
    import { ref } from 'vue';
    import { registerUserApi } from '@/api';


    export default {

        
        setup() {

            const router = useRouter();

            const userData = ref( {

                email: '',
                firstName: '',
                lastName: '',
                password: ''
            });


            const registrationError = ref(null);

            const register = async () => {

            try{

                console.log('calling registerUserApi function ');
                console.log('userData: ' + userData);

                await registerUserApi(userData.value);

                console.log('RegisterUserApi call returned.');

                router.push('./login');
        
            }

                catch (error) {
                    registrationError.value = error.message || 'An error occured.';
                }
            }//End of registerUserApi function

            return {
                userData,
                register,
                registrationError
            };

        },
    
};//End of export default



</script>

<style>



.textField {

border-radius:5px;
text-align:left;
width:250px;


}

.button{

color:white;
width:180px;
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

    
</style>