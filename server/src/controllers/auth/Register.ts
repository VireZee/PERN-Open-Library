import AppDataSource from '../../DataSource'
import User from '../../models/User'
import { Request, Response } from 'express'
import { defSvg, valName, frmtName, valUname, frmtUname, valEmail, Hash, genToken } from '../../utils/Validation'

const Register = async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User)
        const { name, uname, email, pass, rePass, show } = req.body
        const errs: Record<string, string> = {}
        const nameErr = valName(name)
        const unameErr = await valUname(uname)
        const emailErr = await valEmail(email)
        if (nameErr) errs.name = nameErr
        if (unameErr) errs.uname = unameErr
        if (emailErr) errs.email = emailErr
        if (!pass) errs.pass = "Password can't be empty!"
        if (!show && pass !== rePass) errs.rePass = "Password do not match!"
        if (Object.keys(errs).length > 0) res.status(422).json({ errs })
        else {
            const newUser = userRepo.create({
                photo: Buffer.from(defSvg(name), 'base64'),
                name: frmtName(name),
                username: frmtUname(uname),
                email,
                pass: await Hash(pass),
                created: new Date()
            })
            await userRepo.save(newUser)
            const t = genToken(newUser.user_id, newUser.name, newUser.username, newUser.email)
            res.cookie('!', t, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "strict",
                priority: "high"
            })
            res.status(200).json()
        }
    } catch {
        res.status(500).json()
    }
}
export default Register