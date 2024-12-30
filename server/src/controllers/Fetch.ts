import AppDataSource from '../DataSource'
import Col from '../models/Collection'
import { Request, Response } from 'express'

const Fetch = async (req: Request, res: Response) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const user_id = Number(req.query.user_id)
        const isbn = String(req.query.isbn)
        const bookCollection = await colRepo.findOne({
            where: {
                user_id,
                isbn
            }
        })
        res.status(200).json({ status: bookCollection ? true : false })
    } catch {
        res.status(500).json()
    }
}
export default Fetch