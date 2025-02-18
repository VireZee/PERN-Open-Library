import AppDataSource from '../../../DataSource'
import Col from '../../../models/Collection'
import { GraphQLError } from 'graphql'

const AddRemove = async (_: null, args: { user_id: number, cover_i: string, isbn: string, title: string, author_name: string }) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const { user_id, cover_i, isbn, title, author_name } = args
        const bookCollection = await colRepo.findOne({
            where: {
                user_id,
                cover_i,
                isbn,
                title,
                author_name
            }
        })
        if (bookCollection) await colRepo.remove(bookCollection)
        else {
            const newBookCollection = colRepo.create({
                user_id,
                cover_i,
                isbn,
                title,
                author_name,
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