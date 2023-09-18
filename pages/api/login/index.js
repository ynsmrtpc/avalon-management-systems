import initialize from "@/pages/api/Models/ProfileModel";
import { authenticateUser, generateToken } from "@/utils/auth";
import { serialize } from 'cookie';
export default async function login(req, res) {
    const { username, password } = req.body;
    const { UserInfo } = await initialize();

    let token = "";

    const result = await authenticateUser(username, password);

    if (!result.error) {
        token = await generateToken(result.username, "superadmin");

        UserInfo.update({
            login_token: token
        }, {
            where: {
                id: result.id
            }
        });

        // Cookie'yi oluşturuyoruz
        const cookie = serialize('login_token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        // Cookie'yi cevap başlığına ekliyoruz
        res.setHeader('Set-Cookie', cookie);
    }
    // oluşturduğumuz token'ı veritabanında kişiye basacağız ve aynı zamanda cookie'ye ekleyeceğiz.
    res.status(200).json({ error: result.error, message: result.message });
}