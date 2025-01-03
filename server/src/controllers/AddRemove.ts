import AppDataSource from '../DataSource'
import Col from '../models/Collection'
import { Request, Response } from 'express'

const AddRemove = async (req: Request, res: Response) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const { user_id, isbn } = req.body
        const bookCollection = await colRepo.findOne({
            where: {
                user_id,
                isbn
            }
        })
        if (bookCollection) {
            await colRepo.delete(bookCollection)
        } else {
            const newCollection = colRepo.create({
                user_id,
                isbn,
                created: new Date()
            })
            await colRepo.save(newCollection)
        }
        res.status(200).json()
    } catch {
        res.status(500).json()
    }
}
export default AddRemove