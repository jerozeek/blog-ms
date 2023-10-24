import { Router } from 'express';
import { use } from '../../../Core/middleware/use.middleware';
import { UserController } from '../http/user.controller';

const router = Router();

router.post('/update-profile/:id', use(UserController.updateProfile));
router.get('/get-profile', use(UserController.getProfile));

export = router;