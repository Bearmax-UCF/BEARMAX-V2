<template>

    <h1>This is the Edit note page</h1>

    






    <p>Head back to View Patient Notes page</p>

    <router-link to="/viewpatientnotes">
        <font-awesome-icon icon="pencil-alt" size="2x" style=""/>
    </router-link>

</template>


<script>

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    import { ref } from 'vue';
    import { createNoteApi} from '@/api';
    import { useRouter} from 'vue-router';


    export default {

        setup() {

            const router = useRouter();

            const noteToBeEdited = ref ({

                title: '',
                date: '',
                note: ''
            });

            const editNoteError = ref(null);

            const editNote = async () => {

                try{
                    
                    console.log('calling createNoteApi function ');
                    const response = await createNoteApi(newNote.value);

                    console.log("response is");
                    console.log(response);

                    console.log("response. is")
                    console.log("");


                    console.log('EditNoteApi call returned.');
                    router.push('./viewpatientnotes');

                }

                catch (error) {
                    console.log("failed");
                    editNoteError.value = error.message || 'An error occured.';
                }

            }//End of editNote function


            return {

                noteToBeEdited,
                editNote,
                editNoteError

            };//End of return

        },//End of setup

    }//End of export default 






</script>

<style>


</style>