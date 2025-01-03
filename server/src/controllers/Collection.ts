import AppDataSource from '../DataSource'
import Col from '../models/Collection'
import { Request, Response } from 'express'

const Collection = async (req: Request, res: Response) => {
    try {
        const colRepo = AppDataSource.getRepository(Col)
        const { u, t, p } = req.query
    } catch {
        res.status(500).json()
    }
}
export default Collection