import AppDataSource from '../../../DataSource'
import User from '../../../models/User'
import { GraphQLError } from 'graphql'

const Data = async (_: null, args: { api_key: string }) => {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const { api_key } = args
        const hashBuffer = Buffer.from(api_key, 'hex')
        const user = await userRepo.findOne({ where: { api_key: hashBuffer } })
        if (!user) return { message: 'Invalid API Key!'}
        return {
            user_id: user.user_id,
            email: user.email,
            username: user.username
        }
    } catch {
        throw new GraphQLError('Internal Server Error', { extensions: { code: '500' } })
    }
}
export default Data