<template>
    
    <h1>This is the View Data page</h1>

    <router-link to="/homepage" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>


    <button @click="getEmotionRecognitionData">Get Emotion Recognition Data</button>

    <button @click="saveEmotionRecognitionData">Save Emotion Recognition Data</button>


    
    
    
    
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Cookies from 'js-cookie';
import { useRouter} from 'vue-router';
import { ref } from 'vue';
import { getEmotionRecognitionDataApi, saveEmotionRecognitionDataApi } from '@/api';


export default {

    setup() {

        const router = useRouter();

        if(!Cookies.get("auth_token")) {

            router.push('/');

            return {

            };
        }



        const allGames = ref(Array());

        const getEmotionRecognitionDataError = ref(null);

        //const userEmotionRecognitionData = ref();

        const getEmotionRecognitionData = async() => {

        try {

            const response = await getEmotionRecognitionDataApi();
            allGames.value = response.allGames;

            console.log("response.allGames is: " + response.allGames);
            console.log("allGames.value is: " + allGames.value);

        }

        catch(error) {
            console.log("failed");
            getEmotionRecognitionDataError.value = error.message || 'An error occured.';
            console.log(getEmotionRecognitionDataError);
        }


        }//End of getEmotionRecognitionData function

        const saveEmotionRecognitionDataError = ref(null);

        const saveEmotionRecognitionData = async() => {

            try {

                const response = await saveEmotionRecognitionDataApi();

            }

            catch(error) {

                console.log("failed");
                saveEmotionRecognitionDataError.value = error.message || 'An error occured.';

            }


        }




        return {

            getEmotionRecognitionData,
            getEmotionRecognitionDataError,
            saveEmotionRecognitionData,
            saveEmotionRecognitionDataError,
            //userEmotionRecognitionData,

        };


    }//End of setup

}//End of export default


</script>

<style>


    
</style>