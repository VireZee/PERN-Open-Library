import AppDataSource from '../DataSource'
import User from '../models/User'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const userRepo = AppDataSource.getRepository(User)
const defSvg = (name: string) => {
    const initials = name.split(' ').map(w => w.charAt(0).toUpperCase()).slice(0, 5).join('')
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
        <circle cx="256" cy="256" r="256" fill="#000"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-family="Times New Roman" font-size="128" fill="white">${initials}</text>
    </svg>`
    return svg
}
const valName = (name: string) => {
    if (!name) {
        return "Name can't be empty!"
    } else if (name.length >= 75) {
        return "Name is too long!"
    }
    return
}
const frmtName = (name: string) => {
    const nameParts = name.split(' ')
    const cap = nameParts.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    return name = cap.join(' ')
}
const valUname = async (uname: string) => {
    if (!uname) {
        return "Username can't be empty!"
    } else if (!/^[\w\d]+$/.test(uname)) {
        return "Username can only contain Latin Alphabets, Numbers, and Underscores!"
    } else if (uname.length >= 20) {
        return "Username is too long!"
    } else if (await userRepo.findOne({ where: { username: uname } })) {
        return "Username is unavailable!"
    }
    return
}
const frmtUname = (uname: string) => {
    return uname.toLowerCase()
}
const valEmail = async (email: string) => {
    if (!email) {
        return "Email can't be empty!"
    } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return "Email must be valid!"
    } else if (await userRepo.findOne({ where: { email } })) {
        return "Email is already registered!"
    }
    return
}
const Hash = async (pass: string) => {
    const genSecKey = () => {
        const ranges = [
            { s: 0x0020, e: 0x007E },
            { s: 0x00A1, e: 0x02FF },
            { s: 0x0370, e: 0x052F }
        ]
        const str: string[] = []
        ranges.forEach(r => {
            for (let i = r.s; i <= r.e; i++) {
                str.push(String.fromCharCode(i))
            }
        })
        let rslt = ''
        for (let i = 0; i < 2048; i++) {
            const shfl = Math.floor(Math.random() * str.length)
            rslt += str[shfl]
        }
        return rslt
    }
    const opt: argon2.Options = {
        hashLength: 4096,
        timeCost: 13,
        memoryCost: 1024 * 1024,
        parallelism: 13,
        type: 2,
        salt: Buffer.from(genSecKey(), 'utf-8')
    }
    return await argon2.hash(pass, opt)
}
const genToken = (name: string, uname: string, email: string) => {
    const t = jwt.sign({ name, uname, email }, process.env.SECRET_KEY!, { algorithm: 'HS512', expiresIn: '30d' })
    return t
}
export { defSvg, valName, frmtName, valUname, frmtUname, valEmail, Hash, genToken }