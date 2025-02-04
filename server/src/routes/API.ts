import express from 'express'
import APICon from '../controllers/api/API'

const router = express.Router({
    caseSensitive: true,
    strict: true
})
router.get('/API/:hash', APICon)
export default router