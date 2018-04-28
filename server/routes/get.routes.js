import { Router } from 'express';
import * as GetController from '../controllers/get.controller';
const router = new Router();

// Get audio
router.route('/getAudio').get(GetController.getAudio);

export default router;
