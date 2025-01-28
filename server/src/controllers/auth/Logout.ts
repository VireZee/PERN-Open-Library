import { Request, Response } from 'express'

const LogOut = (_: Request, res: Response) => {
    res.clearCookie('!')
    res.status(200).json()
}
export default LogOut