<template>
    
    <h1>This is the Settings page</h1>

    <router-link to="/homepage" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>
    
    
    <div style="position: absolute; left: 2.5%; top: 12.5%;">

        <router-link to="/edituserinformation">
            
            <button class="button" style="width:200px; margin-bottom: 10px;">
                
                Edit Information
                
            </button>
            
        </router-link>
        
        <br>
        
        <router-link to="/deleteuser">
            
            <button class="button" style="width:200px;">
                
                Delete User
                
            </button>
            
        </router-link>

        <br>

        <router-link to="/passwordreset">
            
            <button class="button" style="width:200px;">
                
                Password Reset
                
            </button>
            
        </router-link>
    
    </div>
    
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';


export default {


    setup() {

        const router = useRouter();

        if(!Cookies.get("auth_token")) {

            router.push('/');

            return {

            };

        }//End of if (token is not present, don't let user into this page)


        return {

        }

    }//End of setup


};//End of export default


</script>

<style>


    
</style>