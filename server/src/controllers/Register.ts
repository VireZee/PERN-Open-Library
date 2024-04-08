import { Request, Response } from 'express';
import { valUname, valEmail } from '../utils/Validation';

const Register = (req: Request, res: Response) => {
    const { name, uname, email, pass, rePass, show } = req.body;
    const errs: Record<string, string> = {};
    const unameErr = valUname(uname);
    const emailErr = valEmail(email);
    if (!name) errs.name = "Name can't be empty!";
    if (unameErr) errs.uname = unameErr;
    if (emailErr) errs.email = emailErr;
    if (!pass) errs.pass = "Password can't be empty!";
    if (!show && pass !== rePass) errs.match = "Password do not match!";
    const code = Object.keys(errs).length > 0 ? 422 : 200;
    return res.status(code).json(code === 200 ? req.body : { errs });
}
export default Register;