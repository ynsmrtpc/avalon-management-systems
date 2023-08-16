import jwt from 'jsonwebtoken';
import initialize from "@/pages/api/Models/ProfileModel";

export async function authenticateUser(username, password) {
    const { UserInfo } = await initialize();

    try {
        const data = await UserInfo.findOne({
            attributes: ["id"],
            where: {
                username: username,
                password: password
            }
        });

        if (data) {
            return { error: 0, message: "Giriş Yapıldı", id: data.id };
        } else {
            return { error: 1, message: "Kullanıcı adı veya şifre hatalı!" };
        }
    } catch (error) {
        return "Veritabanı hatası"
    }
}

export function generateToken(username, role) {
    return jwt.sign({ username, role }, `${process.env.SECRET_KEY}`, { expiresIn: '1h' });
}