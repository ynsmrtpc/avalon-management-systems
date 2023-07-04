import {Sequelize} from 'sequelize';
import pg from 'pg';
// https://answers.netlify.com/t/cloud-function-cannot-connect-to-postgresql-with-sequelizejs-in-production-works-locally/50179
export async function connectToDatabase() {
    const db = new Sequelize('postgres', 'postgres', process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        schema: "avalon"
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
