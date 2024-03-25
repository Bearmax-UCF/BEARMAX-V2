<template>
    
    <h1>This is the Delete User page</h1>

    <router-link to="/settings" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>

    <button @click = "deleteUser"> 

        Delete User

    </button>
   
    <br><br>


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