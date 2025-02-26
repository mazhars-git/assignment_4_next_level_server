import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.post(
  '/register',
  // validateRequest(createUserValidationSchema),
  UserControllers.registerUser,
);

export const UserRoutes = router;
