import {Op} from "sequelize";
import init_profile from "@/pages/api/Models/ProfileModel";
import init_yet from "@/pages/api/Models/CertificateModel";

export default async function handler(req, res) {
    const {BlogsModel} = await init_yet();
    const {UserInfo} = await init_profile();

    BlogsModel.belongsTo(UserInfo, {foreignKey: 'user_id', as: 'user'});

    await BlogsModel.findAll({
        attributes: ['title', 'readTime', 'imageURL', 'spot', 'url', 'user_id', 'status'],
        include: [{
            // model: UserInfo yerine model: UserInfo, as: 'user' yazın
            model: UserInfo,
            as: 'user',
            attributes: ['name_surname'],
            where: {
                id: {[Op.col]: 'medium_blogs.user_id'} // ilişki koşulunu belirtiyoruz
            }
        }],
        order: [['title', 'ASC']]
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`});
        });
}
