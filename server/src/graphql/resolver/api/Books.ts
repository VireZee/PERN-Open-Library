import AppDataSource from '../../../DataSource'
import Book from '../../../models/Collection'
import { GraphQLError } from 'graphql'

const Books = async (parent: { user_id: number }) => {
    try {
        const bookRepo = AppDataSource.getRepository(Book)
        const { user_id } = parent
        const books = await bookRepo.find({ where: { user_id } })
        return books.map(book => ({
            cover_i: book.cover_i,
            isbn: book.isbn,
            title: book.title,
            author_name: book.author_name
        }))
    } catch {
        throw new GraphQLError('Internal Server Error', { extensions: { code: '500' } })
    }
}
export default Books