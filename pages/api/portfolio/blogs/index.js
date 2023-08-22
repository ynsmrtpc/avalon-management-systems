import {Op} from "sequelize";
import init_profile from "@/pages/api/Models/ProfileModel";
import init_portfolio from "@/pages/api/Models/PortfolioModel";
import {getUserInfo} from "@/utils/getUserInfo";

export default async function handler(req, res) {
    const {BlogsModel} = await init_portfolio();
    const {UserInfo} = await init_profile();

    let {id, process, data} = req.body;
    data = data !== undefined ? JSON.parse(data) : "";

    let whereConditions = {};
    if (id) {
        whereConditions.id = id;
    }

    switch (process) {
        case "insert":
            await BlogsModel.create({
                title: data.title,
                readTime: data.readTime,
                imageURL: data.imageURL,
                spot: data.spot,
                url: data.url,
                user_id: data.user_id,
                status: data.status
            })
                .then(() => res.status(200).json({error: 0, message: "Kayıt Başarılı"}))
                .catch(err => res.status(500).json({error: 1, message: `Kayıt hatası: ${err}`}))
            break;

        case "update":
            await BlogsModel.update({
                    title: data.title,
                    readTime: data.readTime,
                    imageURL: data.imageURL,
                    spot: data.spot,
                    url: data.url,
                    user_id: data.user_id,
                    status: data.status
                },
                {
                    where: {
                        id: data.id
                    }
                })
                .then(() => res.status(200).json({error: 0, message: `Güncelleme işlemi başarılı`}))
                .catch(err => res.status(500).json({error: 1, message: `Güncelleme hatası: ${err}`}))
            break;

        case "delete":
            await BlogsModel.destroy({
                where: {
                    id: id
                }
            })
                .then(() => res.status(200).json({error: 0, message: `Silme işlemi başarılı`}))
                .catch(err => res.status(500).json({error: 1, message: `Silme hatası ${err}`}))
            break;

        case "get":
            BlogsModel.belongsTo(UserInfo, {foreignKey: 'user_id', as: 'user'});
            const user_id = await getUserInfo(req, res);

            await BlogsModel.findAll({
                attributes: ['id', 'title', 'readTime', 'imageURL', 'spot', 'url', 'user_id', 'status'],
                include: [{
                    // model: UserInfo yerine model: UserInfo, as: 'user' yazın
                    model: UserInfo,
                    as: 'user',
                    attributes: ['name_surname'],
                    where: {
                        id: {[Op.col]: 'portfolio_blogs.user_id'} // ilişki koşulunu belirtiyoruz
                    }
                }],
                where:{
                    user_id: user_id
                },
                order: [['title', 'ASC']]
            })
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`});
                });
            break;

        case "get_authors":
            UserInfo.findAll({
                attributes: ['id','name_surname'],
                order: [['title', 'ASC']]
            })
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`});
                });
            break;
    }
}