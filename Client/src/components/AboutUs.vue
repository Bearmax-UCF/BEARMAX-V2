<template>
    
    <h1>This is the About Us page</h1>

    <!-- Back button to Homepage -->
    <router-link to="/homepage" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>


    <div style="position: absolute; left: 2.5%; top: 12.5%;">

        <!-- Mission Statement -->
        <button class = "button" style="width:250px; margin-bottom: 10px;">
            Mission Statement

        </button>

        <br>

        <!-- How to Use -->
        <button class = "button" style="width:250px; margin-bottom: 10px;">
            How to Use

        </button>

        <br>

        <!-- Data Collection -->
        <button class = "button" style="width:250px; margin-bottom: 10px;">
            Data Collection

        </button>

        <br>

        <!-- Contact Us -->
        <button class = "button" style="width:250px">
            Contact Us

        </button>

    </div>



</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


export default {

};


</script>

<style>


    
</style>