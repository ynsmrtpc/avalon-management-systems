    import jwt from 'jsonwebtoken';

    export default async function getUserData(req) {
        const cookies = req.headers.cookie;
        const token = cookies?.split(';').find(cookie => cookie.trim().startsWith('login_token='))?.split('=')[1];
        const secretKey = `${process.env.SECRET_KEY}`;

        try {
            const decodedToken = jwt.verify(token, secretKey);
            const { username } = decodedToken;
            return username ;
        } catch (error) {
            return null;
        }
    };

