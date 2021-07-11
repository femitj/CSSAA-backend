import { Router } from 'express';
import authRoute from './auth.routes';
import locationRoute from './location.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/location', locationRoute);

export default router;
