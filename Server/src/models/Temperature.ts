import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const Temperature = new mongoose.Schema(
    {
        TempData: {type: Array},
        TempTime: {type: Array},
        EventTime: {type: Array},
        UserID: {type: String}
    },
    { 
        collection: 'Temperature' 
    }
);

const model = mongoose.model('Temperature', Temperature)

export default model