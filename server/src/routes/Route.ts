import express from 'express'
import RegCon from '../controllers/auth/Register'
import LogCon from '../controllers/auth/Login'
import FetCon from '../controllers/book/Fetch'
import AddRemCon from '../controllers/book/AddRemove'
import ColCon from '../controllers/book/Collection'
import GenCon from '../controllers/api/Generate'
import ChckCon from '../controllers/api/Check'
import APICon from '../controllers/api/API'
import OutCon from '../controllers/auth/SignOut'

const router = express.Router({
    caseSensitive: true,
    strict: true
})
router.post('/API/register', RegCon)
router.post('/API/login', LogCon)
router.get('/API/fetch', FetCon)
router.post('/API/add', AddRemCon)
router.post('/API/remove', AddRemCon)
router.get('/API/collection', ColCon)
router.post('/API/generate', GenCon)
router.get('/API/check', ChckCon)
router.get('/API/:hash', APICon)
router.delete('/API/signout', OutCon)
export default router