import AppDataSource from '../DataSource'
import Col from '../models/Collection'
import { Request, Response } from 'express'

const Collection = async (req: Request, res: Response) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const { user_id, cover, title, author, isbn } = req.body
        const bookCollection = await colRepo.findOne({
            where: {
                user_id,
                cover_i: cover,
                title,
                author,
                isbn
            }
        })
        if (bookCollection) {
            await colRepo.delete(bookCollection)
        } else {
            const newCollection = colRepo.create({
                user_id,
                cover_i: cover,
                title,
                author,
                isbn,
                created: new Date()
            })
            await colRepo.save(newCollection)
        }
        return res.status(200).json()
    } catch {
        return res.status(500).json()
    }
}
export default Collection