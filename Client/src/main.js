import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import axios from 'axios'

import { library, config } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


library.add(faCoffee);
library.add(faPlus);
library.add(faPencilAlt);
library.add(faTrashAlt);
library.add(faFloppyDisk);
library.add(faArrowLeft);


// import store from './store'; 

//working way to run application

const app = createApp(App);

app.config.globalProperties.$http = axios;

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.mount('#app');



// axios.defaults.withCredentials = true

// Vue.config.productionTip = false

// new Vue({
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app')





