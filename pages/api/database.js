import { Sequelize } from 'sequelize';
export async function connectToDatabase() {
    const db = new Sequelize({
        dialect: 'mysql',
        port: 3306,
        host: '35.241.215.25',
        username: 'root',
        password: '1209',
        database: 'avalon',
        // host: 'localhost',
        // username: 'root',
        // password: '1234',
        // database: 'avalon',
    });
    try {
        await db.authenticate();
        console.log('Veritabanı bağlantısı başarılı.');
        return db;
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        throw error;
    }
}
