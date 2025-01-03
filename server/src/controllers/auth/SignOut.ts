import { Request, Response } from 'express'

const SignOut = (_: Request, res: Response) => {
    res.clearCookie('!')
    res.status(200).json()
}
export default SignOut