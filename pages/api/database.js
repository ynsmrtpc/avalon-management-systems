import {Sequelize} from 'sequelize';

export async function connectToDatabase() {
    const db = new Sequelize('postgres', 'postgres', 'nemutluturkumdiyene1907', {
        host: 'db.wxpbrdtmrnvqglioltbm.supabase.co',
        dialect: 'postgres',
        schema: "avalon"
    });
    // const db = new Sequelize('postgres', 'postgres', 'nemutluturkumdiyene1907**', {
    //     host: 'db.wxpbrdtmrnvqglioltbm.supabase.co',
    //     dialect: 'postgres',
    // });
    try {
        await db.authenticate();
        console.log('Veritabanı bağlantısı başarılı.');
        return db;
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        throw error;
    }
}
