import AppDataSource from '../DataSource'
import User from '../models/User'
import { Request } from 'express'
import { GraphQLError } from 'graphql'
import { verToken } from '../utils/Validation'

const Auth = {
    Query: {
        auth: async (_: null, __: {}, context: { req: Request }) => {
            const t = context.req.cookies['!']
            if (!t) throw new GraphQLError('Unauthorized', { extensions: { code: '401' } })
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
                if (!user) throw new GraphQLError('Unauthorized', { extensions: { code: '401' } })
                return {
                    user_id: user.user_id,
                    photo: Buffer.from(user.photo).toString('base64'),
                    name: user.name,
                    uname: user.username,
                    email: user.email
                }
            } catch {
                throw new GraphQLError('Internal Server Error', { extensions: { code: '500' } })
            }
        }
    }
}
export default Auth