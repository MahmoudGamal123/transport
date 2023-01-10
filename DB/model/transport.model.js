import mongoose from 'mongoose';

const transportationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['car', 'bus', 'train']
  },
  startLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String,
    required: true
  },
  rode :{
    type: String,
    required: true
  }
});

const TransportationModel = mongoose.model('Transportation', transportationSchema);

export default TransportationModel;
