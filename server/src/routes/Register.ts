import express from 'express';
import RegCon from '../controllers/Register';

const router = express.Router();
router.post('/api/register', RegCon);
export default router;