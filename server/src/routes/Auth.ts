import express from 'express'
import RegCon from '../controllers/Register'
import LogCon from '../controllers/Login'
import AuthMid from '../middlewares/Auth'
import AddRemCon from '../controllers/AddRemove'
import FetCon from '../controllers/Fetch'
import ColCon from '../controllers/Collection'
import OutCon from '../controllers/SignOut'

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