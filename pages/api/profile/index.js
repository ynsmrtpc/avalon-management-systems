import {connectToDatabase} from "@/pages/api/database";
import {DataTypes} from "sequelize";

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const UserInfo = db.define("system_users", {
        name_surname: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        login_token: DataTypes.STRING,
        title: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        profile_photo: DataTypes.STRING
    }, {
        tableName: 'system_users',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    })

    try {
        const data = await UserInfo.findOne({
            where: {
                id: 1,
            }
        });

        if(data){
            res.status(200).json(data);
        } else {
            res.status(404).json({message: 'Veri bulunamadı'});
        }
    } catch (error) {
        res.status(500).json({message: 'Veri çekme hatası:' + error});
    }
}