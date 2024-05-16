import mongoose,{Schema} from "mongoose";

// Define the schema
const registrationSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expirationTime: {
    type: Date,
    required: true
  },
  name: {
    type: String
  },
  age: {
    type: Number
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  phoneNumber: {
    type: String
  },
  status: {
    type: String,
    enum: ['tokenGenerated', 'registered'],
    default: 'tokenGenerated'
  }
});




export const Registration = mongoose.model('Registration', registrationSchema);
