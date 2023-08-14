import initialize from "@/pages/api/Models/ProfileModel";
import {getUserInfo} from "@/utils/getUserInfo";
export default async function handler(req, res) {
    const { UsersSocialMedia } = await initialize();
    let {process, attributes} = req.body
    attributes = attributes ? attributes.split(",") : null;
    let message = "";
    const user_id = await getUserInfo(req, res);

    switch (process) {
        case "social_media_add":
            if (req.method === 'POST') {
                const {url, socialMedia} = req.body

                try {
                    await UsersSocialMedia.update({[socialMedia]: url}, {
                        where: {user_id: user_id},
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
                    attributes: attributes,
                    where: {
                        user_id: user_id
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

        case "all_social_media":
            try {
                const data = await UsersSocialMedia.findAll({
                        order: [['id', 'ASC']]
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