import init_portfolio from "@/pages/api/Models/PortfolioModel";
import {getUserInfo} from "@/utils/getUserInfo";

export default async function handler(req, res) {
    const {GeneralInfoModel, SocialMediaModel} = await init_portfolio();

    const {action} = req.body;

    const user_id = await getUserInfo(req, res);

    switch (action) {
        case "getSocial":
            try {
                let socialMedias = await SocialMediaModel.findAll({
                    where: {
                        user_id: user_id
                    }
                });

                if (socialMedias.length === 0) {
                    const newSocialMedia = await SocialMediaModel.create({
                        user_id: user_id,
                    });
                    socialMedias = [newSocialMedia]; // Yeni kaydı dizinin içine ekleyerek güncelliyoruz
                }

                res.status(200).json(socialMedias);
            } catch (error) {
                res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`});
            }
            break;
        case "addSocial":
            let {data} = req.body;
            data = data !== undefined ? JSON.parse(data) : "";

            const isData = await SocialMediaModel.findOne({where: {user_id: user_id}});
            // eğer böyle bir kaydımız yoksa insert işlemi yapıyoruz

            if (!isData) {
                await SocialMediaModel.create({[data.socialMediaName]: data.socialMediaURL}, {
                    where: {user_id: user_id},
                })
                    .then(() => res.status(200).json({error: 0, message: `Kayıt işlemi başarılı`}))
                    .catch(err => res.status(500).json({error: 1, message: `Kayıt hatası: ${err}`}));
                break;
            }
            // eğer kayıt varsa update yapıyoruz
            await SocialMediaModel.update({[data.socialMediaName]: data.socialMediaURL}, {
                where: {user_id: user_id},
            })
                .then(() => res.status(200).json({error: 0, message: `Güncelleme işlemi başarılı`}))
                .catch(err => res.status(500).json({error: 1, message: `Güncelleme hatası: ${err}`}))
            break;

        case "getAbout":
            await GeneralInfoModel.findAll({
                order: [['id', 'ASC']],
                where: {
                    user_id: user_id
                }
            })
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`});
                });
            break;
        case "addAbout":

            break;
    }
}