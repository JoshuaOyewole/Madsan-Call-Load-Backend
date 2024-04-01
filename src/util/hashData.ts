import bcrypt from "bcryptjs";

const hashData = (data: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(data, salt);

    return hashed;
}
const verifyHashedData = (unhashed: string, hashed: string) => {
    const match = bcrypt.compareSync(unhashed, hashed);
    return match;
}

export { hashData, verifyHashedData };