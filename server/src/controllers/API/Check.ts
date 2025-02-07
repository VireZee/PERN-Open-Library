import { Request, Response } from 'express'
import AppDataSource from '../../DataSource'
import User from '../../models/User'

const Check = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const user_id = Number(req.query.u)
        const user = await userRepo.findOne({
            where: { user_id }
        })
        if (user!.api_key) {
            res.status(200).json({ apiKey: user!.api_key.toString('hex') })
        } else {
            res.status(200).json({ apiKey: null })
        }
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ e: e.message })
        } else {
            res.status(500).json()
        }
    }
}
export default Check