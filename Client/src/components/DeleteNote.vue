<template>

    <h1>This is the Delete Note page</h1>

   

    <p>Head back to View Patient Notes page</p>
    <router-link to="/viewpatientnotes">
    <font-awesome-icon icon="trash-alt" size="2x" style=""/>
    </router-link>


</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { deleteNoteApi} from '@/api';
import { useRouter} from 'vue-router';

    export default {

        setup() {

           

        }//End of setup

    }//End of export default



</script>


<style>


</style>