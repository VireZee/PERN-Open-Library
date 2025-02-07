import { Request, Response } from 'express'
import AppDataSource from '../../DataSource'
import User from '../../models/User'
import crypto from 'crypto'

const Generate = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const { user_id } = req.body
        const user = await userRepo.findOne({ where: { user_id } })
        const randomString = crypto.randomBytes(64).toString('hex')
        const apiKey = crypto.createHash('sha3-512').update(randomString).digest('hex')
        user!.api_key = Buffer.from(apiKey, 'hex')
        await userRepo.save(user!)
        res.status(200).json({ apiKey })
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ e: e.message })
        } else {
            res.status(500).json()
        }
    }
}
export default Generate