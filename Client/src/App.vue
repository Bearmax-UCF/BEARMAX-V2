<template>
    <div>
      <!-- <router-link to="/login">Login</router-link> -->
      <!-- <p>before router view</p> -->
      
  
      <router-view></router-view>
    </div>

    <!-- <p>after router-view</p> -->
  </template>
  

  <script>

    import {defineComponent} from 'vue';
    import Login from './components/Login.vue';
    import Homepage from './components/Homepage.vue';
    import Settings from './components/Settings.vue';
    import AboutUs from './components/AboutUs.vue';
    import ViewPatientNotes from './components/ViewPatientNotes.vue';
    import ViewData from './components/ViewData.vue';
    import SignUp from './components/SignUp.vue';
    import ForgotPassword from './components/ForgotPassword.vue';


    export default defineComponent({
        
        components: {
            Login,Homepage,Settings,AboutUs,ViewPatientNotes,ViewData, SignUp, ForgotPassword
            
        },
    
    });

  </script>

<style>

</style>


