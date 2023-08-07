import {serialize} from "cookie";

export default async function index(req, res) {
// Çerezi silmek için aynı isim ve path değeriyle boş bir çerez oluşturuyoruz
    const emptyCookie = serialize('login_token', '', {
        httpOnly: true,
        maxAge: 0, // Çerez ömrünü 0 olarak ayarlayarak çerezi hemen silebiliriz
        path: '/',
    });

// Boş çerezi cevap başlığına ekleyerek çerezi siliyoruz
    res.setHeader('Set-Cookie', emptyCookie);
    res.status(200).end();
}

