import express from 'express';

import { generateLink,loadForm,registerUser} from '../controllers/registrationController.js';


const router = express.Router();

router.post('/generate-link', generateLink);
router.get('/register/:token', loadForm);
router.post('/register', registerUser);



export default router;