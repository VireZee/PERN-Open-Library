import AppDataSource from '../../../DataSource'
import Col from '../../../models/Collection'
import { GraphQLError } from 'graphql'

const Fetch = async (_: null, args: { user_id: number, isbn: string }) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const { user_id, isbn } = args
        const bookCollection = await colRepo.findOne({
            where: {
                user_id,
                isbn
            }
        })
        return {
            isbn,
            added: !!bookCollection
        }
    } catch (e) {
        if (e instanceof GraphQLError) throw e
        else throw new GraphQLError('Internal Server Error', { extensions: { code: '500' } })
    }
}
export default Fetch