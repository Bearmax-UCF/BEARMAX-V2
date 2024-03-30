<template>

    <router-link to="/homepage" style="position: absolute; left: 1.5%; top: 2%;">
        <font-awesome-icon icon="arrow-left" size="2x" style=""/>
    </router-link>
    
    <!-- <h1>This is the View Patient Notes page</h1> -->
    <!-- <div id="wrapper"> -->

    <div style="position: absolute; top: 0%; left:36%;">

        <!-- <p style="position: absolute; top: 0%; left: 30%;"> -->
        <h2>
            Please select a note from the left side bar
        </h2>

    </div>

    <div style="position:absolute; right:1.5%; top:2%;">

        <router-link to="/createnote" style="margin-right:6px;">
            <font-awesome-icon icon="plus" size="2x" style=""/>
        </router-link>

        <button @click="saveEditedNote">
            <font-awesome-icon icon="floppy-disk" size="2x" style="margin-right:4px;"/>
        </button>


        <button @click="deleteNote">
            <font-awesome-icon icon="trash-alt" size="2x" style=""/>
        </button>

    </div>


        
    <div style="position: absolute; left:2.5%; top:15%;">


        <li v-for="note in userNotes">

            <button class="button" @click="outputTextArea(note)" style="margin:5px;">


                <!-- button label -->
                {{ note.title }}

            </button>
            

        </li>
    </div>


    <!-- Text area for title -->
    <textarea v-model="textAreaTitle" style="width:200px; height:50px; position:absolute; left:28%; 
        top: 15%; resize:none;">
            
    </textarea> 


    <!-- Text area for notes -->
    <textarea v-model="textAreaVal" style="width:700px; height:400px; position:absolute; left:28%; 
        top: 30%; resize:none;">

            

    </textarea> 

    <!-- <button @click="getAllNotes">
    
        Get All Notes
    
    </button> -->
    
    <br>

    

<br><br><br>
       
    <img src="../assets/bearmaxlogo.png" height=100px width="100px" style="position:absolute; bottom: 5%; left:45%;">


</template>


<script>

    import { editNoteApi, getAllNotesApi, deleteNoteApi} from '@/api';
    import { ref } from 'vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import Cookies from 'js-cookie';
    import { useRouter} from 'vue-router';
 

    export default {
        
        setup() {

            const router = useRouter();

            if(!Cookies.get("auth_token")) {

                router.push('/');

                return {

                };

            }
            
            const titleArr = ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"];
            
            const textAreaTitle = ref();
            const textAreaVal = ref();
            
            //This function's purpose is to output the value of the given note object (passed as parameter)
               //to this components' text areas, and to set selectedNote title, note, and note id to
                  //the values in the given note object
            const outputTextArea = async (noteObject) => {

                try{    
                    
                    console.log("Beginning of outputTextArea(noteObject) function");

                    selectedNote.title = noteObject.title;
                    console.log("selectedNote.title is " + selectedNote.title);

                    selectedNote.note = noteObject.note;
                    console.log("selectedNote.note is " + selectedNote.note);

                    selectedNote.note_id = noteObject._id;
                    console.log("selectedNote.note_id is " + selectedNote.note_id);

                    textAreaTitle.value = noteObject.title;
                    console.log("textAreaTitle.value is " + textAreaTitle.value);

                    textAreaVal.value = noteObject.note;
                    console.log("textAreaVal.value is " + textAreaVal.value);

                    console.log("Selected note content is: ");
                    console.log(selectedNote);


                    console.log("NoteObject is: ");
                    console.log(noteObject);
                } 

                catch(error) {
                    console.log(error.message);
                } 

            }//End of outputTextArea function

            const saveEditedNoteError = ref(null);
            
            const saveEditedNote = async() => {

                try{

                    console.log("Beginning of saveEditedNote, beginning of try block");

                    console.log("before changing selectedNote.title value, it is " + selectedNote.title);
                    selectedNote.title=textAreaTitle.value;
                    console.log("after setting selectedNote.title value to textAreaTitle.value " +
                    ", it is " + selectedNote.title);


                    console.log("before changing selectedNote.note value, it is " + selectedNote.note);
                    selectedNote.note=textAreaVal.value;
                    console.log("after setting selectedNote.note value to textAreaVal.value " +
                    ", it is " + selectedNote.note);


                    console.log('calling editNoteApi function ');
                    const response = await editNoteApi({title:selectedNote.title,note:selectedNote.note}, 
                    selectedNote.note_id);

                    console.log("response is");
                    console.log(response);


                    console.log('EditedNoteApi call returned.');

                    getAllNotes();

                    console.log("selectedNote is: ");
                    console.log(selectedNote);

                }

                catch (error) {
                    console.log("failed");
                    saveEditedNoteError.value = error.message || 'An error occured.';
                }
                


            }//End of const saveEditedNote function


        const deleteNoteError = ref(null);

        const deleteNote = async () => {

            try{
                
                console.log('calling deleteNoteApi function ');

                console.log("selectedNote.note_id is " + selectedNote.note_id);

                
                const response = await deleteNoteApi(selectedNote.note_id);
                
                console.log("response is");
                console.log(response);
                
                console.log('DeleteNoteApi call returned.');

                textAreaTitle.value = "";
                textAreaVal.value = "";
                selectedNote.note_id = "";
                selectedNote.title = "";
                selectedNote.note = "";

                getAllNotes();

            }

            catch (error) {
                console.log("failed");
                deleteNoteError.value = error.message || 'An error occured.';
            }

        }//End of deleteNote function



            const newNote = ref ({

                title: '',
                date: '',
                note: ''
            });

            const selectedNote = ref( {

                note_id: '',
                title: '',
                note: '',
            });

            
            const getAllNotesError = ref(null);
            const userNotes = ref(Array());
           
            const getAllNotes = async () => {

                try{
                    
                    console.log('calling getAllNotesApi function ');
                    const response = await getAllNotesApi();

                    console.log("response is");
                    console.log(response);

                    console.log("response.allNotes is")
                    console.log(response.allNotes);


                    console.log("user notes content is: ");
                    console.log(userNotes);

                    //Set the value of userNotes (this files' notes) to the notes retrived from the API call
                    console.log("before  userNotes = response.allNotes");
                    userNotes.value = response.allNotes;

                    console.log("user notes content is: ");
                    console.log(userNotes);

                    console.log('GetAllNotesApi call returned.');

        
            }

                catch (error) {
                    console.log("failed");
                    getAllNotesError.value = error.message || 'An error occured.';
                }

            }//End of getAllNotes function

            getAllNotes();
            
            return {
                titleArr,
                outputTextArea,
                getAllNotes,
                getAllNotesError,
                userNotes,
                newNote,
                selectedNote,
                textAreaTitle,
                textAreaVal,
                saveEditedNote,
                saveEditedNoteError,
                deleteNote,
                deleteNoteError,

            }//End of return


        }//End of setup

        
    };//End of export default


</script>


<style>


/* #wrapper {
    margin-left:auto;
    margin-right:auto;
    width:1300px;
} */

    
</style>

