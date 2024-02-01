import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userSchemaValidation } from './user.validation';

const router = Router();
router.post(
  '/register',
  validateRequest(userSchemaValidation.userValidation),
  userController.createUser,
);
router.post(
  '/login',
  validateRequest(userSchemaValidation.loginValidation),
  userController.loginUser,
);
router.post(
  '/refresh-token',userController.refreshToken,
);

export const userRouter = router;
