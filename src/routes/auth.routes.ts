import { Router } from 'express';
import Auth from '../controllers/Auth';
import {
  driverLoginSchema,
  driverSignupSchema,
} from '../validations/authSchema';
import validator from '../middlewares/validator';

const authRoute = Router();

authRoute.post(
  '/register/driver',
  validator(driverSignupSchema),
  Auth.createDriver
);

authRoute.post('/register/user', Auth.createPassenger);

authRoute.post('/login', Auth.login);

export default authRoute;
