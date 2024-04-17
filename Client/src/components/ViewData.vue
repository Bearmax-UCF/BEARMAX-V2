<template>
    
  <!-- <h1>This is the View Data page</h1> -->

   


    <router-link to="/homepage" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>

    <!-- Buttons to test api functions -->
    <div style="position: absolute; top: 65%; left: 30%;">

      <!-- <button class = "button" style="margin-right:10px;" @click="getEmotionRecognitionData">View Raw Data</button> -->
      
      <!-- <button style="margin-right:10px;" @click="saveEmotionRecognitionData">Save Emotion Recognition Data</button> -->
      
      <!-- <button @click="deleteEmotionRecognitionData">Delete Emotion Recognition Data</button> -->
      
    </div>

    
  
    
    <!-- Beginning of example graph -->

    <!-- <div style="position: absolute; left:2.5%; top:15%;">


    <li v-for="(game,index) in allGames">

        <button class="button" @click="outputGameData(game, index)" style="margin:5px;">
            
            game {{ index }}
        </button>

        </li>

    </div> -->
    
    <!-- end of example d3 graph -->



    <div :style="{ position: 'absolute', left: '20%', top: '15%', backgroundColor: 'white' }">

      <svg ref="svg" :style="{backgroundColor: white, width: `${widthRef}px`,height: `${heightRef}px`}">
        <g class="plot-area-happy"></g>
      </svg>

    </div>


    <!-- Text area for raw data -->
    <textarea v-model="rawDataTable" style="width:700px; height:400px; position:relative; left:28%; 
        top: 70%; resize:none;">

            

    </textarea> 

    <img src="../assets/newbearmaxlogo.png" style= "position: relative; top: 90%; left: 45%;" height=260px width="260px">

    <!-- <div style="position: absolute; right: 20%; top: 15%; background-color: white;">

      <svg ref="svg2">
        <g class="plot-area-sad"></g>
      </svg>

    </div>

  <div style="position: absolute; left: 20%; bottom: 35%; background-color: white;">

  <svg ref="svg3">
    <g class="plot-area-angry"></g>
  </svg>

  </div>

  <div style="position: absolute; right: 20%; bottom: 35%; background-color: white;">

  <svg ref="svg4">
    <g class="plot-area-neutral"></g>
  </svg>

  </div> -->




</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Cookies from 'js-cookie';
import { useRouter} from 'vue-router';
import { ref } from 'vue';
import { getEmotionRecognitionDataApi, saveEmotionRecognitionDataApi, deleteEmotionRecognitionDataApi } from '@/api';
// import { createGraphV2Api } from '@/api';
import * as d3 from 'd3';




export default {
  

//     data() {



      
//       return {

//       //   data: [
//       //   { x: new Date("2024-03-15T02:00Z"), y:100 },
//       //   { x: new Date("2024-03-17T01:00Z"), y: 25 },
//       //   { x: new Date("2024-03-22T11:00Z"), y: 55 },
//       //   { x: new Date("2024-03-29T07:00Z"), y: 75 },
//       // ],

//       data: setupData,

//       margin: { top: 20, right: 20, bottom: 30, left: 40 },
//       width: 400,
//       height: 200

//         //example graph data
//         // data: {
//         //   Red: 10,
//         //   Blue: 20,
//         //   Green: 15,
//         //   Yellow: 25
//         // }






//     };//End of return (inside data)
//   },//End data()


 


//   mounted() {
//     this.createGraph();
//   },

//   methods: {
//     getRandomColor() {
//       // Generate a random color in hex format
//       return '#' + Math.floor(Math.random()*16777215).toString(16);
//     },

//     createGraph() {

//       console.log("Inside create graph method, allGames.value is: " + this.allGames.value);

//       const allDates = [new Date("2024-03-15T02:00Z"), new Date("2024-03-17T01:00Z"),
//         new Date("2024-03-22T11:00Z"),
//         new Date("2024-03-29T07:00Z")];

//       console.log("all dates is" + allDates);

//       const svg = d3.select(this.$refs.svg)
//         .attr("width", this.width + this.margin.left + this.margin.right)
//         .attr("height", this.height + this.margin.top + this.margin.bottom)
//         .append("g")
//         .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

//       const xScale = d3.scaleTime()
//         .nice()
//         .domain(d3.extent(allDates))
//         .range([0, this.width]);

//       const yScale = d3.scaleLinear()
//         .domain([0, d3.max(this.data, d => d.y)])
//         .range([this.height, 0]);

//       const line = d3.line()
//         .x(d => xScale(d.x))
//         .y(d => yScale(d.y));

//       svg.append("path")
//         .datum(this.data)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-width", 2)
//         .attr("d", line);

//         //x-axis label
//       svg.append("text")
// 			   .attr("text-anchor", "end")
//          .attr("transform", `translate(${this.width / 2},${this.height - this.margin.bottom / 2})`)
// 			   .text("Game Date");
    

//       //y-axis label
//       svg.append("text")
//         .attr("text-anchor", "start")
//         .attr("transform", `rotate(-90) translate(${-this.height / 2},${this.margin.left / 2})`)
//         .text("Percent Correct");

//   },//End of createGraph function
// },


    setup() {


        const router = useRouter();

        if(!Cookies.get("auth_token")) {

            router.push('/');

            return {

            };
        }

        const getEmotionRecognitionDataError = ref(null);


        const allGames = ref(Array());
        const rawData = ref(null);
        const selectedSessionCorrectArr = ref(Array());
        const selectedSessionWrongArr = ref(Array());
        const selectedSessionNumPlays = ref();
        const userId = ref();
        const emotionId = ref();

        const rawDataTable = ref();

        rawDataTable.value = "";
        

        const gameData = [

        {
            Correct: [3, 2, 4, 4],
            Wrong: [2, 3, 1, 1],
            NumPlays: 20,
            GameFin: new Date("2024-03-15T02:00Z"),
        },

        {
            Correct: [2, 1, 4, 1],
            Wrong: [3, 4, 1, 4],
            NumPlays: 20,
            GameFin: new Date("2024-03-18T02:00Z"),    
        },

        {
            Correct: [1, 1, 3, 3],
            Wrong: [4, 4, 2, 2],
            NumPlays: 20,
            GameFin: new Date("2024-03-21T02:00Z"),    
        }
        
    ];



//Start of printGameData function
const printGameData = () => {
          
          console.log("at the start of printGameData function");
          
          console.log("inside printGameData function, allGames.value is ");
          console.log(allGames.value);
          
          rawDataTable.value += "Raw Data: \n\n";

          
          
          for(var i = 0; i < allGames.value.length; i++) {
            

            console.log("inside for loop of printGameData, trying to add to rawDataTable");
            var game = allGames.value[i];

            var formattedDate = new Date(game.GameFin).toLocaleString();

            
            rawDataTable.value += "Game " + (i+1) + "\n";
            rawDataTable.value += "   Date: " + formattedDate + "\n";
            rawDataTable.value += "   Number of faces shown: " + game.NumPlays + "\n";

            var correctTotal = 0;
            var wrongTotal = 0;

            rawDataTable.value += "             Happy     Sad   Angry Neutral    All\n";

            rawDataTable.value += "   Correct "; 
            for(var j = 0; j < game.Correct.length; j++) {

              rawDataTable.value += (game.Correct[j] + " ").padStart(8,' ');
              correctTotal += game.Correct[j];

            }//End of for(game.correct.length)

            rawDataTable.value += (correctTotal + " ").padStart(7, ' ');

            rawDataTable.value += "\n";

            rawDataTable.value += "   Wrong   "; 
            for(var k = 0; k < game.Wrong.length; k++) {

              rawDataTable.value += (game.Wrong[k] + " ").padStart(8,' ');
              wrongTotal += game.Wrong[k];

            }//End of for(game.wrong.length)

            rawDataTable.value += (wrongTotal + " ").padStart(7, ' ');


            rawDataTable.value += "\n";

            var accuracyPercentage = -1;
            var overallAccuracy = -1;

            rawDataTable.value += "   Ratio   "; 
            for(var r = 0; r < (game.Correct.length); r++) {

              accuracyPercentage = (Math.round((game.Correct[r] / (game.Correct[r] + game.Wrong[r])) * 100));

              rawDataTable.value += (accuracyPercentage + "" + "%").padStart(8,' ');

            }//End of for(ratio)

            console.log("outside loop, correct total is " + correctTotal);
            console.log("outside loop, wrong total is " + wrongTotal);
            accuracyPercentage = Math.round((correctTotal / (correctTotal + wrongTotal)) * 100); 
            rawDataTable.value += (accuracyPercentage + "" + "%").padStart(7, ' ');



            rawDataTable.value += "\n\n";


            
            
          }//End of for loop
          
          //rawDataTable.value += "addition from after the for loop";
          
          console.log("at the end of printGameData function");
          
          
        }//End of printGameData function
        

const getEmotionRecognitionData = async() => {

  try {

      //using api call

      // const response = await getEmotionRecognitionDataApi();
      // console.log("finished waiting emotion game api");
      // allGames.value = response.allGames;

      // console.log("response.allGames is: ");
      // console.log(response.allGames);


      allGames.value = gameData;

      console.log("allGames.value is: ");
      console.log(allGames.value);

      printGameData();

      // userId.value = response.allGames[0].userID;
      // console.log("response.allGames[0].UserID is: " + response.allGames[0].UserID);

      // emotionId.value = response.allGames[0]._id;
      // console.log("emotionId.allGames._id is: " + response.allGames[0]._id);


  }

  catch(error) {
      console.log("In getEmotionRecognitionData, an error occured");
      getEmotionRecognitionDataError.value = error.message || 'An error occured.';
      console.log(getEmotionRecognitionDataError);
  }


}//End of getEmotionRecognitionData function





const svg = ref(null);
const svg2 = ref(null);
const svg3 = ref(null);
const svg4 = ref(null);
const widthRef = ref();
const heightRef = ref();




const drawGraph = async() => {

          console.log("calling getEmotionRecognitionData");

          await getEmotionRecognitionData();

        //beginning of graph code

        const margin = { top: 20, right: 30, bottom: 20, left: 30 };

        const width = 800 -  margin.right - margin.left;
        widthRef.value = width;

        const height = 400 - margin.top - margin.bottom;
        heightRef.value = height;


        const happyGraphData = ref(Array());
        const sadGraphData = ref(Array());
        const angryGraphData = ref(Array());
        const neutralGraphData = ref(Array());

        const allDates = ref(Array());




        
        console.log("inside setup funciton, graph code section, allGames.value is ");
        console.log(allGames.value);


        var happyCorrectTotal = 0;
        var happyWrongTotal = 0;
        var happyPercentage = -1;

        var sadCorrectTotal = 0;
        var sadWrongTotal = 0;
        var sadPercentage = -1;

        var angryCorrectTotal = 0;
        var angryWrongTotal = 0;
        var angryPercentage = -1;

        var neutralCorrectTotal = 0;
        var neutralWrongTotal = 0;
        var neutralPercentage = -1;

          //setting values of # of correct and wrong in each emotion to calculate percentages

        // allGames.value.forEach((element) => {

        //     happyCorrectTotal += element.Correct[0];
        //     happyWrongTotal += element.Wrong[0];

        //     console.log("happy correct total is " + happyCorrectTotal);

        //     sadCorrectTotal += element.Correct[1];
        //     sadWrongTotal += element.Wrong[1];

        //     console.log("sad correct total is " + sadCorrectTotal);

        //     angryCorrectTotal += element.Correct[2];
        //     angryWrongTotal += element.Wrong[2];

        //     console.log("angry correct total is " + angryCorrectTotal);

        //     neutralCorrectTotal += element.Correct[3];
        //     neutralWrongTotal += element.Wrong[3];

        //     console.log("neutral correct total is " + neutralCorrectTotal);
            

        // });



        
        //setting happyGraphData values

        // allGames.value.forEach((element, index) => {

        //   happyGraphData.value.push({x: new Date((element.GameFin)), y: 30});
        //   allDates.value.push(new Date(element.GameFin));
        //   console.log("looping");
          
        // });//End of forEach loop 




        //sample data

        // happyGraphData.value.push({x:(new Date("2024-03-15T02:00Z")), y:75});
        // happyGraphData.value.push({x:(new Date("2024-03-16T02:00Z")), y:35});
        // happyGraphData.value.push({x:(new Date("2024-03-17T02:00Z")), y:50});
        // happyGraphData.value.push({x:(new Date("2024-03-18T02:00Z")), y:10});


        // allDates.value.push(new Date("2024-03-15T02:00Z"));
        // allDates.value.push(new Date("2024-03-16T02:00Z"));
        // allDates.value.push(new Date("2024-03-17T02:00Z"));
        // allDates.value.push(new Date("2024-03-18T02:00Z"));

        // sadGraphData.value.push({x:(new Date("2024-03-15T02:00Z")), y:15});
        // sadGraphData.value.push({x:(new Date("2024-03-16T02:00Z")), y:25});
        // sadGraphData.value.push({x:(new Date("2024-03-17T02:00Z")), y:50});
        // sadGraphData.value.push({x:(new Date("2024-03-18T02:00Z")), y:30});

        // angryGraphData.value.push({x:(new Date("2024-03-15T02:00Z")), y:5});
        // angryGraphData.value.push({x:(new Date("2024-03-16T02:00Z")), y:85});
        // angryGraphData.value.push({x:(new Date("2024-03-17T02:00Z")), y:10});
        // angryGraphData.value.push({x:(new Date("2024-03-18T02:00Z")), y:20});

        // neutralGraphData.value.push({x:(new Date("2024-03-15T02:00Z")), y:75});
        // neutralGraphData.value.push({x:(new Date("2024-03-16T02:00Z")), y:35});
        // neutralGraphData.value.push({x:(new Date("2024-03-17T02:00Z")), y:15});
        // neutralGraphData.value.push({x:(new Date("2024-03-18T02:00Z")), y:10});

        
        //real data

        console.log("allGames.value.size is " + allGames.value.length);


        for(var i = 0; i < allGames.value.length; i++) {

          var game = allGames.value[i];
          //console.log("for loop game");
          //console.log(game);


          allDates.value.push(new Date(game.GameFin));

          happyGraphData.value.push({x:(new Date(game.GameFin)), y: Math.round((game.Correct[0] / (game.Correct[0] + game.Wrong[0])) * 100)});
          sadGraphData.value.push({x:(new Date(game.GameFin)), y: Math.round((game.Correct[1] / (game.Correct[1] + game.Wrong[1])) * 100)});
          angryGraphData.value.push({x:(new Date(game.GameFin)), y: Math.round((game.Correct[2] / (game.Correct[2] + game.Wrong[2])) * 100)});
          neutralGraphData.value.push({x:(new Date(game.GameFin)), y: Math.round((game.Correct[3] / (game.Correct[3] + game.Wrong[3])) * 100)});



        }



        console.log("happy graph data is ");
        console.log(happyGraphData.value);

        console.log("allDates.value is");
        console.log(allDates.value);

        console.log(d3.extent(allDates.value));
        
        svg.value = d3.select('.plot-area-happy')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleTime()
        
        .domain(d3.extent(allDates.value))
        .range([0, width-margin.left]);


      const yScale = d3.scaleLinear()
        //.domain([0, d3.max(happyGraphData.value, d => d.y)])
        .domain([0, 100])
        .range([height-(margin.top/2), 0+(margin.top/2)]);


      //happy line  
      const happyLine = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

      svg.value.append("path")
        .datum(happyGraphData.value)
        .attr("transform", `translate(${margin.left}, ${-margin.bottom*0.77}) scale(0.9)`)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", happyLine);

        //sad line
        const sadLine2 = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

      svg.value.append("path")
        .datum(sadGraphData.value)
        .attr("transform", `translate(${margin.left}, ${-margin.bottom*0.77}) scale(0.9)`)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", sadLine2);

        //angry line

        const angryLine2 = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

      svg.value.append("path")
        .datum(angryGraphData.value)
        .attr("transform", `translate(${margin.left}, ${-margin.bottom*0.77}) scale(0.9)`)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", angryLine2);

        //neutral line

        const neutralLine2 = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

      svg.value.append("path")
        .datum(neutralGraphData.value)
        .attr("transform", `translate(${margin.left}, ${-margin.bottom*0.77}) scale(0.9)`)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 2)
        .attr("d", neutralLine2);

        //x-axis label for happy graph
      svg.value.append("text")
			   .attr("text-anchor", "middle")
         //.attr("transform", `translate(${-height + margin.top + 20})`)
        .attr("transform", `translate(${width/2 - 30}, ${height-margin.bottom} ) `)

			   .text("Game Date");

         
         
         //y-axis label for happy graph
         svg.value.append("text")
         .attr("text-anchor", "start")
         .attr("transform", `translate(${-margin.left+15},${height / 2}) rotate(-90)`)
         .text("Percent Correct");
         
         
         //ticks for x-axis
      const formatTime = d3.timeFormat("%b %d");

      // svg.value.append("g")
      // .attr("class", "x-axis")
      // .attr("transform", `translate(${margin.left}, ${height - 60})`)
      // .call(d3.axisBottom(xScale)
      //     .tickFormat(formatTime) // Use the defined format function
      // );

      svg.value.append("g")
       .attr("transform", `translate(${margin.left}, ${height-(margin.bottom*3)}) scale(0.9)`)
       .call(d3.axisBottom(xScale).tickFormat(formatTime));


       //ticks for y-axis

        //const formatTime = d3.timeFormat("%b %d");

        // svg.value.append("g")
        //   .attr("class", "y-axis")
        //   .attr("transform", `rotate(-90) translate(${-height / 2},${-margin.left / 4})`)
        //   .call(d3.axisBottom(yScale)
        //     .tickFormat() // Use the defined format function
        //   );
    
        svg.value.append("g")
        .attr("transform", `translate(${margin.left}, ${-margin.bottom*0.77}) scale(0.9)`)
        .call(d3.axisLeft(yScale).tickFormat(d => `${d}%`));
        
      

        //graph legend


        const legendData = [
          { label: "Happy", color: "steelblue" },
          { label: "Sad", color: "red" },
          {label: "Angry", color: "green"},
           {label: "Neutral", color: "orange"}];


        const legend = svg.value.append("g")
          .attr("class", "legend")
          .attr("transform", `translate(${width - (margin.right*4)}, ${-margin.bottom*0.07})`);

    // Add legend items
    legend.selectAll("rect")
      .data(legendData)
      .enter().append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 20)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", d => d.color);

    legend.selectAll("text")
      .data(legendData)
      .enter().append("text")
      .attr("x", 20)
      .attr("y", (d, i) => i * 20 + 9)
      .text(d => d.label)
      .attr("class", "legend-text")
      .style("font-size", "12px")
      .style("font-family", "sans-serif");

    //graph title
    svg.value.append("text")
    .attr("x", (width / 2) - margin.left)
    .attr("y", (0)) 
    .attr("text-anchor", "middle") 
    .attr("font-size", "16px") 
    .text("Emotion Identification Accuracy");

      //end of happy graph code



      //beginning of sad graph code

      svg2.value = d3.select('.plot-area-sad')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale2 = d3.scaleTime()
        .nice()
        .domain(d3.extent(allDates.value))
        .range([0, width]);

      const yScale2 = d3.scaleLinear()
        .domain([0, d3.max(sadGraphData.value, d => d.y)])
        .range([height, 0]);

      const sadLine = d3.line()
        .x(d => xScale2(d.x))
        .y(d => yScale2(d.y));

      svg2.value.append("path")
        .datum(sadGraphData.value)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", sadLine);


        //x-axis label for happy graph
      svg2.value.append("text")
			   .attr("text-anchor", "middle")
         //.attr("transform", `translate(${-height + margin.top + 20})`)
        .attr("transform", `translate(${width/4 +40}, ${height / 2 + 25} )`)
			  .text("Game Date");
         
      //y-axis label
      svg2.value.append("text")
        .attr("text-anchor", "start")
        .attr("transform", `rotate(-90) translate(${-height / 2},${-margin.left / 4})`)
        .text("Percent Correct");

        
    svg2.value.append("text")
    .attr("x", (width / 2) - 60)
    .attr("y", (margin.top / 2) - 10) 
    .attr("text-anchor", "middle") 
    .attr("font-size", "16px") 
    .text("Identification Accuracy: Sad");



//end of sad graph code



//beginning of angry graph code

svg3.value = d3.select('.plot-area-angry')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale3 = d3.scaleTime()
        .nice()
        .domain(d3.extent(allDates.value))
        .range([0, width]);

      const yScale3 = d3.scaleLinear()
        .domain([0, d3.max(angryGraphData.value, d => d.y)])
        .range([height, 0]);

      const angryLine = d3.line()
        .x(d => xScale3(d.x))
        .y(d => yScale3(d.y));

      svg3.value.append("path")
        .datum(angryGraphData.value)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", angryLine);


        //x-axis label
      svg3.value.append("text")
			   .attr("text-anchor", "middle")
         //.attr("transform", `translate(${-height + margin.top + 20})`)
        .attr("transform", `translate(${width/4 +40}, ${height / 2 + 25} )`)

			   .text("Game Date");
    
         
      //y-axis label
      svg3.value.append("text")
        .attr("text-anchor", "start")
        .attr("transform", `rotate(-90) translate(${-height / 2},${-margin.left / 4})`)
        .text("Percent Correct"); 

        
    svg3.value.append("text")
    .attr("x", (width / 2) - 60)
    .attr("y", (margin.top / 2) - 10) 
    .attr("text-anchor", "middle") 
    .attr("font-size", "16px") 
    .text("Identification Accuracy: Angry");


//end of angry graph code



//beginning of neutral graph code

svg4.value = d3.select('.plot-area-neutral')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale4 = d3.scaleTime()
        .nice()
        .domain(d3.extent(allDates.value))
        .range([0, width]);

      const yScale4 = d3.scaleLinear()
        .domain([0, d3.max(neutralGraphData.value, d => d.y)])
        .range([height, 0]);

      const neutralLine = d3.line()
        .x(d => xScale4(d.x))
        .y(d => yScale4(d.y));

      svg4.value.append("path")
        .datum(neutralGraphData.value)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", neutralLine);


         //x-axis label for happy graph
      svg4.value.append("text")
			   .attr("text-anchor", "middle")
         //.attr("transform", `translate(${-height + margin.top + 20})`)
        .attr("transform", `translate(${width/4 +40}, ${height / 2 + 30} )`)
			   .text("Game Date");
    
         
      //y-axis label
      svg4.value.append("text")
        .attr("text-anchor", "start")
        .attr("transform", `rotate(-90) translate(${-height / 2},${-margin.left / 4})`)
        .text("Percent Correct");

        
    svg4.value.append("text")
    .attr("x", (width / 2) - 60)
    .attr("y", (margin.top / 2) - 10) 
    .attr("text-anchor", "middle") 
    .attr("font-size", "16px") 
    .text("Identification Accuracy: Neutral");




//end of neutral graph code







      }//End of drawGraph function

        drawGraph();

       
        const saveEmotionRecognitionDataError = ref(null);

        const saveEmotionRecognitionData = async() => {

            try {

                const response = await saveEmotionRecognitionDataApi();

            }

            catch(error) {

                console.log("in saveEmotionRecognitionData, an error occured.");
                saveEmotionRecognitionDataError.value = error.message || 'An error occured.';

            }

        }//End of saveEmotionRecognitionData function

        const deleteEmotionRecognitionDataError = ref(null);


        const deleteEmotionRecognitionData = async() => {

          try {

              //const response = await deleteEmotionRecognitionDataApi(userId);
              //const response = await deleteEmotionRecognitionDataApi(emotionId.value);


          }

          catch(error) {

              console.log("in deleteEmotionRecognitionData, an error occured.");
              deleteEmotionRecognitionDataError.value = error.message || 'An error occured.';

          }

        }//End of deleteEmotionRecognitionData function



      



        
        
       
        
        //printGameData(allGames.value);




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

        }//End of outputGameData function


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
            userId,
            emotionId,
            deleteEmotionRecognitionData,
            deleteEmotionRecognitionDataError,  
            svg,
            svg2,
            svg3,
            svg4,
            drawGraph,
            widthRef,
            heightRef,
            rawData,
            rawDataTable,
            printGameData,

        };


    }//End of setup

}//End of export default


</script>

<style>

    
</style>