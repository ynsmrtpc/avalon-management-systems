import {connectToDatabase} from "@/pages/api/database";
export default async function handler(req, res) {
    const db = await connectToDatabase();
    // "admin_sidebar" tablosundaki verileri çekme işlemi
    const query = 'SELECT id, title, icon, link FROM admin_sidebar order by queue asc';
    const [rows] = await db.query(query);

    const sidebarData = JSON.stringify(rows);
    // Verileri yanıt olarak gönderme
    res.status(200).json(sidebarData);
}
