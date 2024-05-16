import { v4 as uuidv4 } from 'uuid';
import {Registration} from "../models/userModel.js"
import path from 'path';
import { fileURLToPath } from 'url';



const generateLink = async (req, res) => {
    try {
      const token = uuidv4(); // Generate a unique token
      const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // Set expiration time to 1 hour from now
  
      
      const registration = new Registration({ token, expirationTime });
      await registration.save();
  
      const link = `http://localhost:5000/registration/register/${token}`; // Change this to your domain
      res.json({ link });
    } catch (error) {
      console.error('Error generating link:', error);
      res.status(500).json({ error: 'Failed to generate link' });
    }
  };


  const loadForm = async (req, res) => {
    try {
        console.log("1")
      const token = req.params.token;
      const registration = await Registration.findOne({ token });
      console.log(registration)
      if (!registration || new Date() > registration.expirationTime) {
        return res.status(400).json({ error: 'Link has expired or is invalid' });
      }

      console.log("2")
  
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      res.sendFile(path.join(__dirname, '../views/form.html'));
      
      console.log(res.sendFile(path.join(__dirname, '../views/form.html')))

    } catch (error) {
      console.error('Error loading form:', error);
      res.status(500).json({ error: 'Failed to load form' });
    }
  };


  const registerUser = async (req, res) => {
    try {
      const { token, name, age, height, weight, phoneNumber } = req.body;
      const registration = await Registration.findOne({ token });
  
      if (!registration || new Date() > registration.expirationTime) {
        return res.status(400).json({ error: 'Link has expired or is invalid' });
      }
  
      registration.name = name;
      registration.age = age;
      registration.height = height;
      registration.weight = weight;
      registration.phoneNumber = phoneNumber;
      registration.status = 'registered';
  
      await registration.save();
  
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  };
  
  export { generateLink, loadForm, registerUser };











