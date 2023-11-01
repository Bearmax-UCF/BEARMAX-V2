const mongoose = require('mongoose')

const HeartRate = new mongoose.Schema(
    {
        HRData: {type: Array},
        HRTime: {type: Array},
        EventTime: {type: Array},
        UserID: {type: String}
    },
    { 
        collection: 'HeartRate' 
    }
);

const model = mongoose.model('HeartRate', HeartRate)

export default model