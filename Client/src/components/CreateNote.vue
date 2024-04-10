<template>

    <!-- <h1>This is the Create Note page</h1> -->

    <router-link to="/viewpatientnotes" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>

    <!-- <p>Head back to View Patient Notes page</p>

    <router-link to="/viewpatientnotes">

        <font-awesome-icon icon="plus" size="2x" style=""/>

    </router-link> -->

    <br>

    <!-- Create note test -->

    <input type="text" class="textField" placeholder="title" v-model="newNote.title"/>

    <br><br>

    <input type="text" class="textField" placeholder="Date" v-model="newNote.date"/>

    <br><br>

    <!-- <input type="text" class="textField" placeholder="Note" v-model="newNote.note" 
    style="width:600px; height:300px; align-items:flex-start; display:flex;" /> -->

    <textarea v-model="newNote.note" placeholder="Note" style="width:600px; height:300px; position:relative; 
        resize:none;">

    </textarea>

    <br><br>

    <button class = "button" style= "position:relative;" @click="createNote"> Create Note </button> 

    <!-- End of create note test -->

    <br><br>

    <p v-if="createNoteError" style="color: red;">{{ createNoteError }}</p>

    <img src="../assets/newbearmaxlogo.png" style= "position: absolute; top: 35%; right: 1%;" height=270px width="270px">


</template>


<script>

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { ref } from 'vue';
    import { createNoteApi} from '@/api';
    import { useRouter} from 'vue-router';


    export default {

        setup() {

            const router = useRouter();

            const newNote = ref ({

                title: '',
                date: '',
                note: ''
            });

            const createNoteError = ref(null);

            const createNote = async () => {

                try{
                    
                    console.log('calling createNoteApi function ');
                    const response = await createNoteApi(newNote.value);

                    console.log("response is");
                    console.log(response);

                    console.log('CreateNoteApi call returned.');
                    router.push('./viewpatientnotes');

                }

                catch (error) {
                    console.log("failed");
                    createNoteError.value = error.message || 'An error occured.';
                }

            }//End of createNote function


            return {

                newNote,
                createNote,
                createNoteError

            };//End of return

        },//End of setup

    }//End of export default   


</script>

<style>


</style>