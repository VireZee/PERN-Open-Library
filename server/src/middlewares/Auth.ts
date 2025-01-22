import AppDataSource from '../DataSource'
import User from '../models/User'
import { Request, Response } from 'express'
import { verToken } from '../utils/Validation'

const Auth = async (req: Request, res: Response) => {
    const t = req.cookies['!']
    if (!t) res.status(401).json()
    else {
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
            if (!user) res.status(401).json()
            else res.status(200).json({ user_id: user.user_id, photo: user.photo, name: user.name, uname: user.username, email: user.email })
        } catch (e) {
            if (e instanceof Error) {
                res.status(500).json({ e: e.message })
            } else {
                res.status(500).json()
            }
        }
    }
}
export default Auth