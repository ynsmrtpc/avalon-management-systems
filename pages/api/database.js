import { createConnection } from 'mysql2/promise';
export async function connectToDatabase() {
    try {
        // MySQL veritabanına bağlanma işlemi
        const db = await createConnection({
            host: '35.241.215.25',
            user: 'root',
            password: '1209',
            database: 'avalon',
        });
        console.log('Veritabanı bağlantısı başarılı.');
        return db;
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        throw error;
    }
}