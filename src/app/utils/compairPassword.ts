import bcrypt from 'bcrypt';
const comparPassword = (password: string, hashedPassword: string) => {
    const result = bcrypt.compareSync(password, hashedPassword);
    return result
}
export default comparPassword