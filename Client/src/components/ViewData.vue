<template>
    
    <h1>This is the View Data page</h1>

    <router-link to="/homepage" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>

    <button @click="getEmotionRecognitionData">Get Emotion Recognition Data</button>

    <button @click="saveEmotionRecognitionData">Save Emotion Recognition Data</button>


    <!-- beginning of example graph -->

    <h2>Simple Vertical Bar Graph</h2>

    <div class="bar-container">
      <div v-for="(value, label) in data" :key="label" class="bar">

        Padding for the bars to line up at the bottom

        <div class="bar-inner" :style="{ height: (30-value) * 10 + 'px', backgroundColor: '#ffebcd' }">
          {{  }}
        </div>

        Bars that are displayed

        <div class="bar-inner" :style="{ height: value * 10 + 'px', backgroundColor: getRandomColor() }">
          {{ value }}
        </div>

        <div class="label">
          {{ label }}
        </div>

      </div>

    </div>

    <!-- End of example graph -->




    <div style="position: absolute; left:2.5%; top:15%;">


    <li v-for="(game,index) in allGames">

        <button class="button" @click="outputGameData(game, index)" style="margin:5px;">
            <!-- button label -->
            game {{ index }}
        </button>

        </li>

    </div>
    
    <!-- <div class="bar-container">

      <div>

        <div class="bar">
      
        Padding for the bars to line up at the bottom
        <div class="bar-inner" :style="{ height: (30-selectedGameCorrect) * 10 + 'px', backgroundColor: '#ffebcd' 
          }">{{  }}</div>

         Bars that are displayed
        <div class="bar-inner" :style="{ height: selectedGameCorrect * 15 + 'px', backgroundColor: '#008000'}
          ">{{ selectedGameCorrect }}</div>

        </div>

        <div class="label">numCorrect</div>

      </div>

      <div>

        <div class="bar">

        Padding for the bars to line up at the bottom
        <div class="bar-inner" :style="{ height: (30-selectedGameWrong) * 10 + 'px', backgroundColor: '#ffebcd' 
          }">{{  }}</div>

        Bars that are displayed
        <div class="bar-inner" :style="{ height: selectedGameWrong * 15 + 'px', backgroundColor: '#ff0000' }
          ">{{ selectedGameWrong }}</div>

        </div>

        <div class="label">numWrong</div>

      </div> -->
<!-- </div> -->

<!-- 
<div>

  <line-chart :data="chartData" :library="{ scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }"></line-chart>


</div> -->


    <!-- <p style="font-size:20px;">
      Here are the contents of selectedGame
      <br>
      {{ selectedGameCorrect }}
      <br>
      {{ selectedGameWrong }}
      <br>
      {{ selectedGameNumPlays }}
    </p>  -->
    
    
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Cookies from 'js-cookie';
import { useRouter} from 'vue-router';
import { ref } from 'vue';
import { getEmotionRecognitionDataApi, saveEmotionRecognitionDataApi } from '@/api';
import Chart from 'chart.js/auto';





export default {
  



    data() {
      return {
        data: {
          Red: 10,
          Blue: 20,
          Green: 15,
          Yellow: 25
        }
    };
  },


  methods: {
    getRandomColor() {
      // Generate a random color in hex format
      return '#' + Math.floor(Math.random()*16777215).toString(16);
    }
  },


    setup() {

        const router = useRouter();

        if(!Cookies.get("auth_token")) {

            router.push('/');

            return {

            };
        }



        const allGames = ref(Array());

        const selectedSessionCorrectArr = ref(Array());
        const selectedSessionWrongArr = ref(Array());
        const selectedSessionNumPlays = ref();


        const getEmotionRecognitionDataError = ref(null);

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

        }//End of saveEmotionRecognitionData function

        const outputGameData = async(game, index) => {

          try {

            console.log("outputGameData game is " );
            console.log(game);
            console.log("outputGameData index is " + index);

            


            selectedSessionCorrectArr.value = game.Correct;
            console.log("selectedSessionCorrectArr.value is "+ selectedGameCorrect.value);

            selectedSessionWrongArr.value = game.Wrong;
            console.log("selectedSessionWrongArr.value is "+ selectedGameWrong.value);


            selectedSessionNumPlays.value = game.NumPlays;
            console.log("selectedSessionNumPlays.value is "+ selectedGameNumPlays.value);

          }//End of try block

          catch(error) {

            console.log("outputGameData error is " + error.message);
          }

        }


        return {

            getEmotionRecognitionData,
            getEmotionRecognitionDataError,
            saveEmotionRecognitionData,
            saveEmotionRecognitionDataError,
            allGames,
            outputGameData,
            selectedSessionCorrectArr,
            selectedSessionWrongArr,
            selectedSessionNumPlays,
            

            //userEmotionRecognitionData,

        };


    }//End of setup

}//End of export default


</script>

<style>

.bar-container {
  display: flex;
  justify-content: space-around;
}

.bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  margin-top: 5px;
}

.bar-inner {
  width: 30px; /* Width of the bars */
  color: white;
  padding: 5px;
  text-align: center;
}
    
</style>