import AppDataSource from '../DataSource';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const userRepo = AppDataSource.getRepository(User);
const valName = (name: string) => {
    if (!name) {
        return "Name can't be empty!";
    } else if (name.length >= 30) {
        return "Name is too long!";
    }
    return;
}
const valUname = async (uname: string) => {
    if (!uname) {
        return "Username can't be empty!";
    } else if (!/^[\w\d]+$/.test(uname)) {
        return "Username can only contain Latin Alphabets, Numbers, and Underscores!";
    } else if (uname.length >= 20) {
        return "Username is too long!";
    } else if (await userRepo.findOne({ where: { username: uname } })) {
        return "Username is unavailable!";
    }
    return;
};
const valEmail = async (email: string) => {
    if (!email) {
        return "Email can't be empty!";
    } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return "Email must be valid!";
    } else if (await userRepo.findOne({ where: { email } })) {
        return "Email is already registered!";
    }
    return;
};
const genToken = (username: string) => {
    const genSecKey = () => {
        const s = `0123456789!@#$%^&*()_+={}[]|?><,./;:\\'"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZαβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ`;
        let rslt = '';
        for (let i = 0; i < 1024; i++) {
            const shfl = Math.floor(Math.random() * s.length);
            rslt += s[shfl];
        }
        return rslt;
    }
    const t = jwt.sign({ username }, genSecKey(), { algorithm: 'HS512', expiresIn: '1m' });
    return t;
}
export { valName, valUname, valEmail, genToken };