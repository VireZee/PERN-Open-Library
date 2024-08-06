import express from 'express'
import RegCon from '../controllers/Register'
import AuthMid from '../middlewares/Auth'

const router = express.Router()
router.post('/API/register', RegCon)
router.get('/API/auth', AuthMid)
export default router