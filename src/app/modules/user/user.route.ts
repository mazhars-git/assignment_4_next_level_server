import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.post(
  '/register',
  // validateRequest(createUserValidationSchema),
  UserControllers.registerUser,
);
router.post(
  '/login',
  // validateRequest(createUserValidationSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;
