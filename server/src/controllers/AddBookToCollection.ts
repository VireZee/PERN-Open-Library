import { Request, Response } from 'express'

const AddBookToCollection = async (req: Request, res: Response) => {
    try {
        return res.status(200).json()
    } catch {
        return res.status(500).json()
    }
}
export default AddBookToCollection