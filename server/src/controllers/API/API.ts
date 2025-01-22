import { Request, Response } from 'express'
import AppDataSource from '../../DataSource';
import User from '../../models/User';
import Book from '../../models/Collection';

const API = async (req: Request, res: Response) => {
    try {
        const { hash } = req.params
        const hashBuffer = Buffer.from(hash, 'hex')
        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOne({ where: { api_key: hashBuffer } })
        if (!user) {
            res.status(404).json({ message: 'Invalid API key' })
        }
        const bookRepo = AppDataSource.getRepository(Book)
        const books = await bookRepo.find({ where: { user_id: user!.user_id } })
        const result = books.map(book => ({
            isbn: book.isbn,
            title: book.title,
            author_name: book.author_name,
        }))
        res.status(200).json(result)
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ e: e.message })
        } else {
            res.status(500).json()
        }
    }
}
export default API