<template>
    
    <h1 :style="{color: 'forestgreen', textAlign: 'center', fontWeight:'bold'}">Welcome to Bearmax</h1>

    <br>
    <br>
    <br>
    <br>
    <br>


    <button @click="logout" style="position: absolute; top: 2.5%; right:2.5%;">
        <font-awesome-icon icon="right-from-bracket" size="2x" style=""/>
    </button>

    
    <img src="../assets/newbearmaxlogo.png" style= "position: absolute; bottom:35%; right:10%;" height=300px width="300px">
    


        <!-- <div>
            <router-link to="/aboutus">
                <button class = "button">
                    About Us

                </button>

            </router-link>
        </div> -->

        <!-- <br>
        <br> -->

        <!-- Original view patient notes link (non-generated) -->

        <div>
            <router-link to="/viewpatientnotes">
                <button class = "button">
                    View Patient Notes

                </button>

            </router-link>
        </div>

        <br>
        <br>

        <div>
            <router-link to="/viewdata">
                <button class = "button">
                    View Data

                </button>

            </router-link>
        </div>

        <br>
        <br>

        <div>
            <router-link to="/settings">
                <button class = "button">
                    Settings

                

                </button>

            </router-link>
        </div>


        <br>
        <br>
        
        <!-- Link to How to Use page (page to be implemented, if desired) -->

        <!-- <div>
        
            <p>
            
                New user? 
                <router-link to="/howtouse">
                    Go to "How to Use" page.
                </router-link>

            </p>
        </div> -->

</template>


<script>

import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    export default {

        
        setup() {

            console.log("Beginning of setup");

            const router = useRouter();


            if(!Cookies.get("auth_token")) {

                router.push('/');

                return {

                };

            }


            const logout = async () => {

                console.log("beginning of logout function");
                
                try {

                    Cookies.remove("auth_token");
                    router.push('/');

                }//End of try

                catch {

                    

                }//End of catch

                console.log("end of logout function");


            }//End of log out function


            
            console.log("End of setup, before return");

            return {

                logout,

            };//End of return


        }//End of setup




    };//End of export default

</script>

<style scoped>

body {
    background-color: #ffebcd;
}


.welcomeHeader {

    color:green;
    font:bold;

}

.button{

color:white;
width:450px;
height:50px;
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

.textField {

    border-radius:5px;
    text-align:center;


}


    
</style>