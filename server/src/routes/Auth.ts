import express from 'express'
import RegCon from '../controllers/Register'
import LogCon from '../controllers/Login'
import AuthMid from '../middlewares/Auth'
import AddCon from '../controllers/Collection'
import FetCon from '../controllers/Fetch'
import OutCon from '../controllers/SignOut'

const router = express.Router({
    caseSensitive: true,
    strict: true
})
router.post('/API/register', RegCon)
router.post('/API/login', LogCon)
router.get('/API/auth', AuthMid)
router.post('/API/add', AddCon)
router.get('/API/fetch', FetCon)
router.delete('/API/signout', OutCon)
export default router