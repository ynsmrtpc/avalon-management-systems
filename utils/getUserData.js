import jwt from 'jsonwebtoken';

export default async function getUserData(req){
    const token = req.headers.cookie?.replace('token=', '');
    const secretKey = `${process.env.SECRET_KEY}`;

    try {
        const decodedToken = jwt.verify(token, secretKey);
        const { username } = decodedToken;
        return { username };
    } catch (error) {
        return null;
    }
};