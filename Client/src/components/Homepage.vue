<template>
    
    <h1 :style="{color: 'forestgreen', textAlign: 'center', fontWeight:'bold'}">Welcome to Bearmax</h1>

    <br>
    <br>
    <br>
    <br>
    <br>

    <div :style="{position: 'absolute', bottom:'350px', right:'350px'}" top="300px" right="150px">
        <img src="../assets/bearmaxlogo.png" height=210px width="210px">
    </div>


        <div>
            <router-link to="/aboutus">
                <button class = "button">
                    About Us

                

                </button>

            </router-link>
        </div>

        <br>
        <br>

        <div>
            <router-link to="/viewpatientnotes">
                <button class = "button">
                    View Patient Notes

                

                </button>

            </router-link>
        </div>

        <br>
        <br>

        <div>
            <router-link to="/viewdata">
                <button class = "button">
                    View Data

                

                </button>

            </router-link>
        </div>

        <br>
        <br>

        <div>
            <router-link to="/settings">
                <button class = "button">
                    Settings

                

                </button>

            </router-link>
        </div>


        <br>
        <br>
        
        <div>
        
        <p>
        
            New user? 
            <router-link to="/forgotpassword">
                Go to "How to Use" page.
            </router-link>

        </p>
    </div>




</template>

<script>

export default {

};


</script>

<style scoped>

body {
    background-color: #ffebcd;
}


.welcomeHeader {

    color:green;
    font:bold;

}

.button{

color:white;
width:450px;
height:50px;
background-color: darkgreen;
font-size:22px;
font-family:Arial, Helvetica, sans-serif;
text-align: center;
border-radius: 10px;

transition: background-color 1s;

}

.button:hover {

    background-color:goldenrod;
}

.button:focus, .button:active{

    background-color: black;
    transition: none;

}

.textField {

    border-radius:5px;
    text-align:center;


}

    
</style>