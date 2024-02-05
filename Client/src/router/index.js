import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Homepage from '../components/Homepage.vue';
import Settings from '../components/Settings.vue';
import ViewPatientNotes from '../components/ViewPatientNotes.vue'
import ViewData from '../components/ViewData.vue';
import AboutUs from '../components/AboutUs.vue';
import SignUp from '../components/SignUp.vue';
import ForgotPassword from '../components/ForgotPassword.vue'

const routes = [
  
  {
    path: '/login',
    component: Login,
    name: 'login',
  },

  {
    path: '/homepage',
    component: Homepage,
    name: 'homepage',
  },

  {
    path: '/settings',
    component: Settings,
    name: 'settings',
  },

  {
    path: '/aboutus',
    component: AboutUs,
    name: 'aboutus',
  },

  {
    path: '/viewpatientnotes',
    component: ViewPatientNotes,
    name: 'viewpatientnotes',
  },

  {
    path: '/viewdata',
    component: ViewData,
    name: 'viewdata',
  },

  {
    path: '/signup',
    component: SignUp,
    name: 'signup',
  },

  {
    path: '/forgotpassword',
    component: ForgotPassword,
    name: 'forgotpassword',
  },



];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
