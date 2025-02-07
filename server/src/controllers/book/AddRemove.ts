import AppDataSource from '../../DataSource'
import Col from '../../models/Collection'
import { Request, Response } from 'express'

const AddRemove = async (req: Request, res: Response) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const { cover_i, user_id, isbn, title, author_name } = req.body
        const bookCollection = await colRepo.findOne({
            where: {
                user_id,
                cover_i,
                isbn,
                title,
                author_name
            }
        })
        if (bookCollection) {
            await colRepo.delete(bookCollection)
        } else {
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
        res.status(200).json()
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ e: e.message })
        } else {
            res.status(500).json()
        }
    }
}
export default AddRemove