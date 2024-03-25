<template>
    
    <h1>This is the Edit User Information page</h1>

    <router-link to="/settings" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>
    
    <br><br>
    
    <p>Email is:{{ currentUser.email }}</p>
    
    <input type="text" class="textField" placeholder="Email" v-model="userData.email"/>
    
    <br><br>
    
    <p>First name is:{{ currentUser.firstName }}</p>
    
    <input type="text" class="textField" placeholder="First Name" v-model="userData.firstName"/>
    
    <br><br>
    
    <p>Last name is:{{ currentUser.lastName }}</p>
    
    <input type="text" class="textField" placeholder="Last Name" v-model="userData.lastName"/>
    
    <br><br>
    
    <input type="password" class="textField" placeholder="Password" v-model="userData.password"/>
    
    <br><br>
    
    <p>New email is: {{ userData.email }}</p>
    <p>New first name is: {{ userData.firstName }}</p>
    <p>New last name is: {{ userData.lastName }}</p>
    <p>New password is: {{ userData.password }}</p>
    
    
    
    <button @click = "saveChanges">
        
        Save
        
    </button>
    
    <br><br>
    
    
</template>



<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { getUserInfoApi, saveUserChangesApi } from '@/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

export default {

    setup() {


        const router = useRouter();

        if(!Cookies.get("auth_token")) {

            router.push('/');

            return {

            };

        }

        const userData = ref( {

            email: '',
            firstName: '',
            lastName: '',
            password: ''
        });

        const currentUser = ref ({

            userId:'',
            firstName:'',
            lastName:'',
            email:'',
            password: ''
            
        });


        const getUserInformationError = ref(null);

        const getUserInformation = async () => {

            try {

                const response = await getUserInfoApi();
                
                console.log("response is: ");
                console.log(response);

                currentUser.value.email = response.me.email;
                currentUser.value.firstName = response.me.firstName;
                currentUser.value.lastName = response.me.lastName;
                currentUser.value.userId = response.me._id;
                currentUser.value.password = response.me.password;
                

                console.log("first name is " + currentUser.value.firstName);

            }


            catch(error) {
                    getUserInformationError.value = error.message || 'An error occured.';
            }

        }//End of getUserInformation function

        getUserInformation();


        const saveChangesError = ref(null);

        const saveChanges = async () => {
            
            try{

                console.log('calling saveUserChangesApi function ');
                console.log('userData: ' + userData);

                const response = await saveUserChangesApi(userData.value, currentUser.value.userId);

                console.log(response);
                currentUser.value.email = response.user.email;
                currentUser.value.firstName = response.user.firstName;
                currentUser.value.lastName = response.user.lastName;
                currentUser.value.password = response.user.password;

                console.log('SaveUserChangesApi call returned.');

                }

                catch (error) {
                    saveChangesError.value = error.message || 'An error occured.';
                }

        }//End of saveChanges function


        return {
                
            userData,
            saveChanges,
            saveChangesError,
            getUserInformation,
            getUserInformationError,
            currentUser,


        };


    }//End of setup


};//End of export default


</script>

<style>


    
</style>