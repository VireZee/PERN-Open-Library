import AppDataSource from '../../../DataSource'
import User from '../../../models/User'
import { GraphQLError } from 'graphql'

const Check = async (_: null, args: { user_id: number }) => {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const { user_id } = args
        const user = await userRepo.findOne({
            where: { user_id }
        })
        return user!.api_key ? user!.api_key.toString('hex') : null
    } catch (e) {
        if (e instanceof GraphQLError) throw e
        else throw new GraphQLError('Internal Server Error', { extensions: { code: '500' } })
    }
}
export default Check