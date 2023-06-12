import {connectToDatabase} from "@/pages/api/database";
import {DataTypes} from "sequelize";
export default async function handler(req, res) {
    const db = await connectToDatabase();

    const SidebarMenu = db.define('admin_sidebar', {
        title: DataTypes.STRING,
        icon: DataTypes.STRING,
        link: DataTypes.STRING,
        queue: DataTypes.INTEGER,
    }, {
        tableName: 'admin_sidebar',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    try {
        const data = await SidebarMenu.findAll({
            attributes: ['id', 'title', 'icon', 'link'],
            order: [['queue', 'ASC']]
        });

        if(data){
            res.status(200).json(data);
        } else {
            res.status(404).json({message: 'Veri bulunamadı'});
        }
    } catch (error) {
        res.status(500).json({message: 'Veri çekme hatası:' + error});
    }

    // const query = 'SELECT id, title, icon, link FROM admin_sidebar order by queue asc';
    // const [rows] = await db.query(query);
    //
    // const sidebarData = JSON.stringify(rows);
    // // Verileri yanıt olarak gönderme
    // res.status(200).json(sidebarData);
}
