import { Request, Response } from 'express'
import AppDataSource from '../../DataSource'
import User from '../../models/User'
import Books  from '../../graphql/resolver/api/Books'

const API = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const { hash } = req.params
        const hashBuffer = Buffer.from(hash, 'hex')
        const user = await userRepo.findOne({ where: { api_key: hashBuffer } })
        if (!user) res.status(404).json({ message: 'Invalid API Key!' })
        const books = await Books({ user_id: user!.user_id })
        const response = {
            user_id: user!.user_id,
            email: user!.email,
            username: user!.username,
            books
        }
        res.status(200).json(JSON.parse(JSON.stringify(response, null, 2))) // attention to this
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ e: e.message })
        } else {
            res.status(500).json()
        }
    }
}
export default API