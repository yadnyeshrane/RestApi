import express  from 'express';
import { loginController, refreshController, registerController,userController } from '../controller';
import auth from '../middleware/auth';

const router=express.Router();

router.post('/register',registerController.register)
router.post('/login',loginController.login)
router.get('/me',auth,userController.me)
router.post('/refresh',refreshController.refresh)

export default router;


