import Plan from '../models/planModel.js';

// Create a new plan
const createPlan = async (req, res) => {
  const { planType, days, active } = req.body;
  try {
    const newPlan = new Plan({ planType, days, active });
    console.log(newPlan);
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single plan by ID
const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a plan
const updatePlan = async (req, res) => {
  const { planType, days, active } = req.body;
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      { planType, days, active },
      { new: true }
    );
    if (!updatedPlan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json(updatedPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a plan
const deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndRemove(req.params.id);
    if (!deletedPlan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createPlan, getAllPlans, getPlanById, updatePlan, deletePlan };
