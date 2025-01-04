import AppDataSource from '../../DataSource'
import Col from '../../models/Collection'
import { Request, Response } from 'express'

const Collection = async (req: Request, res: Response) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const user_id = Number(req.query.u)
        const page = Number(req.query.p)
        const limit = 100
        const [bookCollection, totalCollection] = await colRepo.findAndCount({
            where: { user_id },
            select: ['cover_i', 'isbn', 'title', 'author'],
            skip: (page - 1) * limit,
            take: limit
        })
        const found = bookCollection.length
        const collection = bookCollection.map(book => ({
            cover_i: book.cover_i,
            isbn: book.isbn,
            title: book.title,
            author: book.author
        }))
        res.status(200).json({found, collection, totalCollection})
    } catch {
        res.status(500).json()
    }
}
export default Collection