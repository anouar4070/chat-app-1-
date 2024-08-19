import  express  from 'express';
import { signup } from '../controllers/AuthController.js';


const authRouters = express.Router();


authRouters.post('/signup', signup);


export default authRouters;