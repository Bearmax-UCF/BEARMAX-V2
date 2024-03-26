<template>
    
    <h1 style="position: absolute; left: 31%; top: 25%;">
            
        Are you sure you want to delete your account?
        
    </h1>

    <router-link to="/settings" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>

    <button @click = "deleteUser" class="button" style="position: absolute; left:42%; top: 45%;"> 

        Delete User

    </button>
   
    <br><br>

    <img src="../assets/bearmaxlogo.png" height=110px width="110px" style="position: absolute; left: 45%; 
        bottom: 5%;">


</template>

<script>

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { deleteUserApi, getUserInfoApi } from '@/api';
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

            }//End of if (token is not present)

            
            const currentUserId = ref();

            const deleteUserError = ref(null);

            const deleteUser = async () => {
                
                try{

                    console.log('calling deleteUserApi function ');

                    const response = await deleteUserApi(currentUserId.value);

                    console.log('DeleteUserApi call returned.');

                }

                catch (error) {
                    deleteUserError.value = error.message || 'An error occured.';
                }

                router.push('/');

            }//End of deleteUser function


            const getUserInformationError = ref(null);
            
            const getUserInformation = async () => {

                try {

                    const response = await getUserInfoApi();
                    
                    console.log("response is: ");
                    console.log(response);

                    currentUserId.value = response.me._id;
                    
                }


                catch(error) {
                        getUserInformationError.value = error.message || 'An error occured.';
                }

            }//End of getUserInformation function

            getUserInformation();


            return {

                deleteUser,
                deleteUserError,
                getUserInformation,
                getUserInformationError,
                currentUserId,


            };


    }//End of setup


};


</script>

<style>


    
</style>