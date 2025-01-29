import AppDataSource from '../../../DataSource'
import User from '../../../models/User'
import { GraphQLError } from 'graphql'
import crypto from 'crypto'

const Generate = async (_: null, args: { user_id: number }) => {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const { user_id } = args
        const user = await userRepo.findOne({ where: { user_id } })
        const randomString = crypto.randomBytes(64).toString('hex')
        const apiKey = crypto.createHash('sha3-512').update(randomString).digest('hex')
        user!.api_key = Buffer.from(apiKey, 'hex')
        await userRepo.save(user!)
        return apiKey
    } catch (e) {
        if (e instanceof GraphQLError) throw e
        else throw new GraphQLError('Internal Server Error', { extensions: { code: '500' } })
    }
}
export default Generate