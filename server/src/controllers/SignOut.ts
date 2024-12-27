import { Request, Response } from 'express'

const SignOut = (_: Request, res: Response) => {
    res.clearCookie('!', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        priority: "high"
    })
    res.status(200).json()
}
export default SignOut