import express from 'express'
import RegCon from '../controllers/Register'
import LogCon from '../controllers/Login'
import AuthMid from '../middlewares/Auth'

const router = express.Router()
router.post('/API/register', RegCon)
router.post('/API/login', LogCon)
router.get('/API/auth', AuthMid)
export default router