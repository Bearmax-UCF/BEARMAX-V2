import mongoose from 'mongoose';

const SensorCalibration = new mongoose.Schema(
    {
       BaseTemp: {type: Number},
       BasePuls: {type: Number},
       BaseResp: {type: Number},
       BaseSCL: {type: Number},
       BaseSCR: {type: Number},
       BaseLat: {type: Number},
       BaseRise: {type: Number},
       BaseRecov: {type: Number},
       BaseSamp: {type: Number},
       UserID: {type: String}
    },
    { 
        collection: 'SensorCalibration' 
    }
);

const model = mongoose.model('SensorCalibration', SensorCalibration)

export default model
