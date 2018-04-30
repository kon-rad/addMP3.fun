import { Router } from 'express';
import * as Controller from '../controllers/controller';
const router = new Router();

// Post audio
router.route('/postAudio').post(Controller.postAudio);
export default router;
