import express from 'express'
import RegCon from '../controllers/Register'
import LogCon from '../controllers/Login'
import AuthMid from '../middlewares/Auth'
import AddCon from '../middlewares/Auth'

const router = express.Router()
router.post('/API/register', RegCon)
router.post('/API/login', LogCon)
router.get('/API/auth', AuthMid)
router.post('/API/add', AddCon)
export default router