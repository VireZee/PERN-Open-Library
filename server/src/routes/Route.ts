import express from 'express'
import RegCon from '../controllers/auth/Register'
import LogCon from '../controllers/auth/Login'
import AuthMid from '../middlewares/Auth'
import AddRemCon from '../controllers/book/AddRemove'
import FetCon from '../controllers/book/Fetch'
import ColCon from '../controllers/book/Collection'
import OutCon from '../controllers/auth/SignOut'

const router = express.Router({
    caseSensitive: true,
    strict: true
})
router.post('/API/register', RegCon)
router.post('/API/login', LogCon)
router.get('/API/auth', AuthMid)
router.post('/API/add', AddRemCon)
router.get('/API/remove', AddRemCon)
router.get('/API/fetch', FetCon)
router.get('/API/collection', ColCon)
router.delete('/API/signout', OutCon)
export default router