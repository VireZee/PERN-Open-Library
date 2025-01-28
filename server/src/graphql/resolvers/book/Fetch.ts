import AppDataSource from '../../../DataSource'
import Col from '../../../models/Collection'
import { GraphQLError } from 'graphql'

const Fetch = async (_: null, args: { user_id: number, isbn: string }) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const bookCollection = await colRepo.findOne({
            where: {
                user_id: args.user_id,
                isbn: args.isbn
            }
        })
        return {
            isbn: args.isbn,
            added: !!bookCollection
        }
    } catch {
        throw new GraphQLError('Internal Server Error', { extensions: { code: '500' } })
    }
}
export default Fetch