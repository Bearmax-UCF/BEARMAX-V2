<template>
    
    <h1 :style="{color:'forestgreen', fontWeight:'bold'}">Create Account</h1>



    <img src="../assets/newbearmaxlogo.png" style= "position: absolute; top: 25%; right: 10%;" height=310px 
        width="310px">

    <router-link to="/" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>


    <br><br><br>

    <div>

        <input type="text" class="textField" placeholder="Email" v-model="userData.email" 
            style="margin-bottom:10px;"/>

        <br>

        <input type="text" class="textField" placeholder="First Name" v-model="userData.firstName" 
            style="margin-bottom:10px;"/>

        <br>

        <input type="text" class="textField" placeholder="Last Name" v-model="userData.lastName" 
            style="margin-bottom:10px;"/>

        <br>

        <input type="password" class="textField" placeholder="Password" v-model="userData.password"/>

        <br>


        <br>
        <br>

    </div>

    <div>

        <button @click="register" class="button" style= "position: absolute; left:31.25%; width:180px;">
            Sign Up

        </button>

        
    </div>

    <br><br>

    <p v-if="registrationError" style="color: red;">{{ registrationError }}</p>

    <br><br>

            
    <p> Already have an account?
        
        <router-link to="/">
            Sign in here.
        </router-link>

    </p>

    
    <!-- <p> Want to learn more about Bearmax?
        
        <router-link to="/aboutus">
            
            About Us
           
            
        </router-link>
        
    </p> -->


</template>

<script>

    import { useRouter} from 'vue-router';
    import { ref } from 'vue';
    import { registerUserApi } from '@/api';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';



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

                router.push('./');
        
            }

                catch (error) {
                    registrationError.value = error.message || 'An error occured.';
                }
            }//End of register function

            return {
                userData,
                register,
                registrationError
            };

        },//End of setup
    
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