import AppDataSource from '../DataSource'
import User from '../models/User'
import { Request, Response } from 'express'
import { verHash, genToken } from '../utils/Validation'

const Login = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const { emailOrUname, pass } = req.body
        const user = await userRepo.findOne({
            where: [
                { email: emailOrUname.toLowerCase() },
                { username: emailOrUname.toLowerCase() }
            ],
        })
        const isPasswordValid = await verHash(pass, user!.pass)
        if (!user || !isPasswordValid) res.status(401).json({ error: 'Invalid login credentials!' })
        else {
            const t = genToken(user.user_id, user.name, user.username, user.email)
            res.cookie('!', t, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "strict",
                priority: "high"
            })
            res.status(200).json()
        }
    } catch {
        res.status(500).json()
    }
}
export default Login