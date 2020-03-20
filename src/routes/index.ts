
import LoginRouter from './LoginRouter';
import ResolveRouter from './ResolveRouter';
import SignUpRouter from './SignUpRouter';
import ActivateRouter from './ActivateRouter';

import * as express from 'express';

const router = express.Router();

router.use('/login', new LoginRouter().router);
router.use('/activate', new ActivateRouter().router);
router.use('/signup', new SignUpRouter().router);
router.use('/resolve', new ResolveRouter().router);


export default router;