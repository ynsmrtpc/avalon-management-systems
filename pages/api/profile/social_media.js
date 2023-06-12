import {connectToDatabase} from "@/pages/api/database";
import {DataTypes} from "sequelize";

export default async function handler(req, res) {
    const {process} = req.body
    const db = await connectToDatabase();
    // users_social_media modelini tanımlıyoruz
    const UsersSocialMedia = db.define('users_social_media', {
        facebook: DataTypes.STRING,
        github: DataTypes.STRING,
        instagram: DataTypes.STRING,
        linkedin: DataTypes.STRING,
        tiktok: DataTypes.STRING,
        twitter: DataTypes.STRING,
        youtube: DataTypes.STRING,
    }, {
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });
    let message = "";

    switch (process) {
        case "social_media_add":
            if (req.method === 'POST') {
                const {url, socialMedia} = req.body

                try {
                    await UsersSocialMedia.update({[socialMedia]: url}, {
                        where: {user_id: 1},
                    });
                    message = "Kayıt Başarılı";
                } catch (error) {
                    message = 'Bir hata oluştu:' + error;
                }
                res.status(200).json(message);
            }
            break;

        case "social_media_get":
            try {
                const data = await UsersSocialMedia.findOne({
                    attributes: ['instagram', 'facebook', 'twitter', 'tiktok', 'youtube', 'linkedin', 'github'], // alacağımız attribute'ları yazıyoruz
                    where: {
                        user_id: 1
                    }
                });
                if (data) {
                    res.status(200).json(data);
                } else {
                    res.status(404).json({message: 'Veri bulunamadı'});
                }
            } catch (error) {
                res.status(500).json({message: 'Veri çekme hatası:' + error});
            }
            break;

    }
}