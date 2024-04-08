const valUname = (uname: string) => {
    if (!uname) {
        return "Username can't be empty!";
    } else if (!/^[\w\d]+$/.test(uname)) {
        return "Username can only contain Latin Alphabets, Numbers, and Underscores!";
    }
    return;
};
const valEmail = (email: string) => {
    if (!email) {
        return "Email can't be empty!";
    } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return "Email must be valid!";
    }
    return;
};
export { valUname, valEmail };