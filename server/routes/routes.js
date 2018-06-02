import { Router } from 'express';
import * as Controller from '../controllers/controller';
const router = new Router();

// Post audio
router.route('/postAudio').post(Controller.postAudio);

// download audio
router.route('/download/:id').get(Controller.download);

export default router;
