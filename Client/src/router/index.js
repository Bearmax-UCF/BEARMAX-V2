import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Homepage from '../components/Homepage.vue';
import Settings from '../components/Settings.vue';
import ViewPatientNotes from '../components/ViewPatientNotes.vue';
import CreateNote from '../components/CreateNote.vue';
import EditNote from '../components/EditNote.vue';
import DeleteNote from '../components/DeleteNote.vue';
import ViewData from '../components/ViewData.vue';
import AboutUs from '../components/AboutUs.vue';
import SignUp from '../components/SignUp.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import EmailVerification from '../components/EmailVerification.vue';
import HowToUse from '../components/HowToUse.vue';


const routes = [
  
  {
    path: '/',
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
    path: '/createnote',
    component: CreateNote,
    name: 'createnote',
  },

  {
    path: '/editnote',
    component: EditNote,
    name: 'editnote',
  },

  {
    path: '/deletenote',
    component: DeleteNote,
    name: 'deletenote',
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

  {
    path: '/emailverification',
    component: EmailVerification,
    name: 'emailverification',
  },

  {
    path: '/howtouse',
    component: HowToUse,
    name: 'howtouse',
  },

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
