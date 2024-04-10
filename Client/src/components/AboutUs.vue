<template>
    
    <h1 style="position: absolute; left: 36%; top: 2%;">This is the About Us page</h1>

    <!-- Back button to Homepage -->
    <router-link to="/homepage" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>


    <div style="position: absolute; left: 2.5%; top: 12.5%;">

        <!-- Mission Statement -->
        <button class = "button" @click="outputTextArea(missionStatementContent)" style="width:250px; 
            margin-bottom: 10px;">
            Mission Statement

        </button>

        <br>

        <!-- How to Use -->
        <button class = "button" @click="outputTextArea(howToUseContent)" style="width:250px; margin-bottom: 10px;">
            How to Use

        </button>

        <br>

        <!-- Data Collection -->
        <button class = "button" @click="outputTextArea(dataCollectionContent)" style="width:250px; margin-bottom: 10px;">
            Data Collection

        </button>

        <br>

        <!-- Contact Us -->
        <button class = "button" @click="outputTextArea(contactUsContent)" style="width:250px">
            Contact Us

        </button>

    </div>

    <textarea v-model="textAreaVal" style="width:700px; height:400px; position:absolute; left:28%; 
        top: 30%; resize:none;">

    </textarea> 




</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';

export default {



    setup() {

        const textAreaVal = ref();

        const missionStatementContent = "We are the Bearmax team. We strive to make a product that helps " +
            "autistic individuals understand emotions better";

        const howToUseContent = "The Bearmax website. \n\n Mobile Application \n The Robot";

        const dataCollectionContent = "We strive to abide by the appropriate privacy policies. We never " +
            "store user's passwords and utilize tokens for better security.";

        const contactUsContent = "Here is the CS Team's contact information. \n Zack Orooji: ";

        const outputTextArea = async (sectionContent) => {

        
            try{    
                    
                    console.log("Beginning of outputTextArea(sectionContent) function");

                    textAreaVal.value = sectionContent;
                    console.log("textAreaVal.value is " + textAreaVal.value);

                   
                } 

                catch(error) {
                    console.log("outputTextArea function error message is " + error.message);
                } 

            }//End of outputTextArea function


        return {

            outputTextArea,
            textAreaVal,
            missionStatementContent,
            howToUseContent,
            dataCollectionContent,
            contactUsContent,


        }//End of return


    }//End of setup


};//End of export default


</script>

<style>


    
</style>