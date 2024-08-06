import AppDataSource from '../DataSource'
import User from '../models/User'
import { Request, Response } from 'express'
import { verToken } from '../utils/Validation'

const Auth = async (req: Request, res: Response) => {
    const t = req.cookies['!']
    if (!t) return res.status(401)
    try {
        const decoded = verToken(t)
        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOne({
            where: {
                user_id: decoded.id,
                name: decoded.name,
                username: decoded.uname,
                email: decoded.email
            }
        })
        if (!user) return res.status(401)
        return res.status(200).json({ photo: user.photo, name: user.name })
    } catch {
        return res.status(401)
    }
}
export default Auth