<template>

    <img src="../assets/bearmaxlogo.png" height=210px width="210px">


    <br>
    <br>
    <br>

    <h1 :style="{color:'forestgreen', fontWeight:'bold'}">Welcome to Bearmax!</h1>
    <br>
    <br>
    <br>

    <div>

        <input type="text" class="textField" placeholder="Username"/>

        <br>
        
        <input type="text" class="textField" placeholder="Password"/>

        <br>

        

        <div>
        
            <p>
            
                Forgot password? 
                <router-link to="/forgotpassword">
                    Click here.
                </router-link>

            </p>
        </div>






    </div>

    <div>

        <router-link to="/homepage">
            <button class="button">
                Login

            

            </button>

        </router-link>

    </div>



    <br>
    <br>
    <br>
    <br>
    
    <br>
    <br>
    <br>
    <br>

    <div>

        <p>
    
        Don't have an account? 
    
        <div>

        <router-link to="/signup">
        
            Sign up here.

        </router-link>

        </div>


        </p>

   </div>

</template>

<script>

export default{
    
};
   

</script>


<style>

body{
background:#ffebcd;
}


.button{

color:white;
width:90px;
height:30px;
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
    text-align:left;


}



</style>