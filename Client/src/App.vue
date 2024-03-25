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
    import AboutUs from './components/AboutUs.vue';
    import CreateNote from './components/CreateNote.vue';
    import DeleteNote from './components/DeleteNote.vue';
    import DeleteUser from './components/DeleteUser.vue';
    import EditNote from './components/EditNote.vue';
    import EditUserInformation from './components/EditUserInformation.vue';
    import EmailVerification from './components/EmailVerification.vue';
    import ForgotPassword from './components/ForgotPassword.vue';
    import Homepage from './components/Homepage.vue';
    import HowToUse from './components/HowToUse.vue';
    import Login from './components/Login.vue';
    import Settings from './components/Settings.vue';
    import SignUp from './components/SignUp.vue';
    import ViewData from './components/ViewData.vue';
    import ViewPatientNotes from './components/ViewPatientNotes.vue';

    
    export default defineComponent({
        
        components: {AboutUs, CreateNote, DeleteNote, DeleteUser, EditNote, EditUserInformation, EmailVerification, 
          ForgotPassword, Homepage, HowToUse, Login, Settings, SignUp, ViewData, ViewPatientNotes}
    
    });

  </script>


