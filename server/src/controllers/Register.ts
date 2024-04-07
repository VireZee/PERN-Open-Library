import { Request, Response } from 'express';

const Register = (req: Request, res: Response) => {
    const { name, uname, email, pass, rePass, show } = req.body;
    const errs: Record<string, string> = {};
    if (!name) errs.name = "Name can't be empty!";
    if (!uname) errs.uname = "Username can't be empty!";
    if (!email) errs.email = "Email can't be empty!";
    if (!pass) errs.pass = "Password can't be empty!";
    if (!show && pass !== rePass) errs.match = "Password do not match!";
    const code = Object.keys(errs).length > 0 ? 422 : 200;
    return res.status(code).json(code === 200 ? req.body : { errs });
}
export default Register;