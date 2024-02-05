<template>
    
    <h1 :style="{color:'forestgreen', fontWeight:'bold'}">Create Account</h1>



    <div :style="{position: 'absolute', top:'100px',}" top="300px">
        <img src="../assets/bearmaxlogo.png" height=210px width="210px">
    </div>


<div>

<input type="text" class="textField" placeholder="Email"/>

<br>


<input type="text" class="textField" placeholder="Username"/>

<br>


<input type="text" class="textField" placeholder="Password"/>

<br>

<input type="text" class="textField" placeholder="Repeat Password"/>

<br>
<br>

</div>

<div>

    <router-link to="/homepage">
            <button class="button" width="180px">
                Sign Up

            

            </button>

        </router-link>

</div>

<div>
        
        <p>
        
            Already have an account? 
            <router-link to="/login">
                Sign in here.
            </router-link>

        </p>
    </div>

   


</template>

<script>

export default {

};


</script>

<style>

.textField {

border-radius:5px;
text-align:left;


}

.button{

color:white;
width:180px;
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



    
</style>