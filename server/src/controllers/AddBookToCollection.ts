import AppDataSource from '../DataSource'
import Book from '../models/Book'
import { Request, Response } from 'express'

const AddBookToCollection = async (req: Request, res: Response) => {
    try {
        const bookRepo = AppDataSource.getRepository(Book)
        const { user_id, cover, title, author, isbn } = req.body
        return res.status(200).json()
    } catch {
        return res.status(500).json()
    }
}
export default AddBookToCollection