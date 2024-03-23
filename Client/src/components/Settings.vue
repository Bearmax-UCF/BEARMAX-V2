<template>
    
    <h1>This is the Settings page</h1>

    <router-link to="/homepage" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>
    
    
    <router-link to="/edituserinformation">
        
        <button>
            
            Edit Information
            
        </button>
        
    </router-link>
    
    
    <router-link to="/deleteuser">
        
        <button>
            
            Delete User
            
        </button>
        
    </router-link>
    
    
    
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {

};


</script>

<style>


    
</style>