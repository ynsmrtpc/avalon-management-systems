import { createConnection } from 'mysql2/promise'
export default async function handler(req, res) {
    try {
        // MySQL veritabanına bağlanma işlemi
        const connection = await createConnection({
            // host: 'localhost',
            // user: 'root',
            // password: '1234',
            // database: 'avalon',
            host: '35.241.215.25',
            user: 'root',
            password: '1209',
            database: 'avalon',
        });

        // "admin_sidebar" tablosundaki verileri çekme işlemi
        const query = 'SELECT id, title, icon, link FROM admin_sidebar order by queue asc';
        const [rows] = await connection.query(query);

        // Verileri JSON formatında dönme işlemi
        const sidebarData = JSON.stringify(rows);

        // Verileri yanıt olarak gönderme
        res.status(200).json(sidebarData);
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        res.status(500).json({error: 'Veritabanı hatası'});
    }
}
