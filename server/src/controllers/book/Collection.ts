import AppDataSource from '../../DataSource'
import Col from '../../models/Collection'
import { Request, Response } from 'express'

const Collection = async (req: Request, res: Response) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const user_id = Number(req.query.u)
        const [bookCollection, totalCollection] = await colRepo.findAndCount({
            where: { user_id },
            select: ['isbn', 'title']
        })
        const collection = bookCollection.map(book => ({
            isbn: book.isbn,
            title: book.title,
        }))
        res.status(200).json({collection, totalCollection})
    } catch {
        res.status(500).json()
    }
}
export default Collection