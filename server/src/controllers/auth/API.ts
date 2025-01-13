import { Request, Response } from 'express'
import AppDataSource from '../../DataSource'
import User from '../../models/User'
import crypto from 'crypto'

const API = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body
        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOne(user_id)
        const randomString = crypto.randomBytes(64).toString('hex')
        const apiKey = crypto.createHash('sha3-512').update(randomString).digest('hex')
        user!.api_key = Buffer.from(apiKey)
        await userRepo.save(user!)
        res.status(200).json({ apiKey })
    } catch (error) {
        console.error(error);
        res.status(500).json()
    }
}
export default API