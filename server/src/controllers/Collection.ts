import AppDataSource from '../DataSource'
import Col from '../models/Collection'
import { Request, Response } from 'express'

const Collection = async (req: Request, res: Response) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const user_id = Number(req.query.u)
        const totalCollection = await colRepo.count({
            where: { user_id }
        })
        res.status(200).json({totalCollection})
    } catch {
        res.status(500).json()
    }
}
export default Collection