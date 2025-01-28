import { ILike } from 'typeorm'
import AppDataSource from '../../../DataSource'
import Col from '../../../models/Collection'
import { GraphQLError } from 'graphql'

const Collection = async (_: null, args: { user_id: number, search?: string, page: number }) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const { user_id, search = '', page } = args
        const limit = 9
        const [bookCollection, totalCollection] = await colRepo.findAndCount({
            where: {
                user_id,
                ...(search && { title: ILike(`%${search}%`) })
            },
            select: ['cover_i', 'isbn', 'title', 'author_name'],
            skip: (page - 1) * limit,
            take: limit,
            order: {
                created: {
                    direction: 'DESC'
                }
            }
        })
        const found = bookCollection.length
        const collection = bookCollection.map(book => ({
            cover_i: book.cover_i,
            isbn: book.isbn,
            title: book.title,
            author_name: book.author_name
        }))
        return { found, collection, totalCollection }
    } catch (e) {
        if (e instanceof GraphQLError) throw e
        else throw new GraphQLError('Internal Server Error', { extensions: { code: '500' } })
    }

}
export default Collection