import { Router } from 'express';
import LocationController from '../controllers/Location';
import Token from '../helpers/Token';

const locationRoute = Router();

locationRoute.post('/save', Token.verifyToken, LocationController.saveLocation);

locationRoute.post(
  '/find_cabs',
  Token.verifyToken,
  LocationController.findCabs
);

export default locationRoute;
