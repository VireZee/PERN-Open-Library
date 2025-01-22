import AppDataSource from '../DataSource'
import User from '../models/User'
import { Request } from 'express'
import { verToken } from '../utils/Validation'

const Auth = {
    Query: {
        auth: async (_: any, __: any, { req }: { req: Request }) => {
            const t = req.cookies['!']
            if (!t) throw new Error('Unauthorized')
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
                if (!user) throw new Error('Unauthorized')
                return {
                    user_id: user.user_id,
                    name: user.name,
                    uname: user.username,
                    email: user.email,
                    photo: user.photo.toString('base64')
                }
            } catch {
                throw new Error('Internal Server Error')
            }
        }
    }
}
export default Auth