import mongoose, { Schema } from 'mongoose';

// Define the schema
const planSchema = new Schema({
  planType: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Plan = mongoose.model('Plan', planSchema);

export default Plan;