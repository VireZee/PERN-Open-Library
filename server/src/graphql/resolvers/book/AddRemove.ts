import AppDataSource from '../../../DataSource'
import Col from '../../../models/Collection'
import { GraphQLError } from 'graphql'

const AddRemove = async (_: null, args: { user_id: number, cover_i: string, isbn: string, title: string, author_name: string }) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const bookCollection = await colRepo.findOne({
            where: {
                user_id: args.user_id,
                cover_i: args.cover_i,
                isbn: args.isbn,
                title: args.title,
                author_name: args.author_name
            }
        })
        if (bookCollection) await colRepo.delete(bookCollection)
        else {
            const newBookCollection = colRepo.create({
                user_id: args.user_id,
                cover_i: args.cover_i,
                isbn: args.isbn,
                title: args.title,
                author_name: args.author_name,
                created: new Date()
            })
            await colRepo.save(newBookCollection)
        }
        return true
    } catch (e) {
        if (e instanceof GraphQLError) throw e
        else throw new GraphQLError('Internal Server Error', { extensions: { code: '500' } })
    }
}
export default AddRemove