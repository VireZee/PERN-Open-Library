import AppDataSource from '../DataSource';
import User from '../models/User';

const userRepo = AppDataSource.getRepository(User);
const valName = async (name: string) => {
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
export { valName, valUname, valEmail };