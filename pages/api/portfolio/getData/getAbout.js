import init_portfolio from "@/pages/api/Models/PortfolioModel";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {

    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200 || 204,
    });

    const {GeneralInfoModel, PortfolioSkillsModel} = await init_portfolio();

    let {user_id, action} = req.body;

    switch (action) {
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

        case "getSkills":
            await PortfolioSkillsModel.findAll({
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
    }

}