import AppDataSource from '../../DataSource'
import Col from '../../models/Collection'
import { Request, Response } from 'express'

const AddRemove = async (req: Request, res: Response) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const { user_id, isbn, title } = req.body
        const bookCollection = await colRepo.findOne({
            where: {
                user_id,
                isbn,
                title
            }
        })
        if (bookCollection) {
            await colRepo.delete(bookCollection)
        } else {
            const newBookCollection = colRepo.create({
                user_id,
                isbn,
                title,
                created: new Date()
            })
            await colRepo.save(newBookCollection)
        }
        res.status(200).json()
    } catch {
        res.status(500).json()
    }
}
export default AddRemove