import express from 'express'
import AuthMid from '../middlewares/Auth'
import RegCon from '../controllers/auth/Register'
import LogCon from '../controllers/auth/Login'
import FetCon from '../controllers/book/Fetch'
import AddRemCon from '../controllers/book/AddRemove'
import ColCon from '../controllers/book/Collection'
import APICon from '../controllers/auth/API'
import OutCon from '../controllers/auth/SignOut'

const router = express.Router({
    caseSensitive: true,
    strict: true
})
router.get('/API/auth', AuthMid)
router.post('/API/register', RegCon)
router.post('/API/login', LogCon)
router.get('/API/fetch', FetCon)
router.post('/API/add', AddRemCon)
router.post('/API/remove', AddRemCon)
router.get('/API/collection', ColCon)
router.post('/API/generate', APICon)
router.delete('/API/signout', OutCon)
export default router