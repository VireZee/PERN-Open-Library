import AppDataSource from '../../../DataSource'
import Col from '../../../models/Collection'
import { Request } from 'express'
import { verToken } from '../../../utils/Validation'
import { GraphQLError } from 'graphql'

const Fetch = async (_: null, args: { isbn: string }, context: { req: Request }) => {
    const t = context.req.cookies['!']
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const { user_id } = verToken(t)
        const { isbn } = args
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