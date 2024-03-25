<template>
    
    <h1>This is the View Data page</h1>

    <router-link to="/homepage" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>
    
    
    
    
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Cookies from 'js-cookie';
import { useRouter} from 'vue-router';

export default {

    setup() {

        const router = useRouter();

        if(!Cookies.get("auth_token")) {

            router.push('/');

            return {

            };

        }

        return {

        };



    }//End of setup

}//End of export default


</script>

<style>


    
</style>