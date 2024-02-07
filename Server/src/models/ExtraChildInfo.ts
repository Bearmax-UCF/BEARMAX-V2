import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const ExtraChildInfo = new mongoose.Schema(
    {
        BearName: {type: String},
        UserName: {type: String},
        UserID: {type: String}
    },
    { 
        collection: 'ExtraChildInfo' 
    }
);

const model = mongoose.model('ExtraChildInfo', ExtraChildInfo)

export default model