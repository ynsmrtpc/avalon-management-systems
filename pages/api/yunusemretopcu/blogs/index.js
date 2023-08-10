import init_profile from "@/pages/api/Models/ProfileModel";
import init_yet from "@/pages/api/Models/CertificateModel";
export default async function handler(req, res) {
    const { BlogsModel } = await init_yet();
    const { UserInfo } = await init_profile();

    BlogsModel.findAll({
        order: [['title', 'ASC']],
        include: [
            {
                model: UserInfo,
                attributes:["name_surname"]
            }
        ]
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`});
        });
}
