import express from 'express'
import FetCon from '../controllers/book/Fetch'
import AddRemCon from '../controllers/book/AddRemove'
import ColCon from '../controllers/book/Collection'
import GenCon from '../controllers/api/Generate'
import ChckCon from '../controllers/api/Check'
import APICon from '../controllers/api/API'

const router = express.Router({
    caseSensitive: true,
    strict: true
})
router.get('/API/fetch', FetCon)
router.post('/API/add', AddRemCon)
router.post('/API/remove', AddRemCon)
router.get('/API/collection', ColCon)
router.post('/API/generate', GenCon)
router.get('/API/check', ChckCon)
router.get('/API/:hash', APICon)
export default router