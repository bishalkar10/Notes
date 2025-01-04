import { Router } from 'express';
import { validateLogin, validateRegister } from '../validators/auth.validator';
import { authController } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.post('/login', validateLogin, asyncHandler(authController.login));
router.post('/register', validateRegister, asyncHandler(authController.register));
router.post('/logout', asyncHandler(authController.logout));

export default router; 