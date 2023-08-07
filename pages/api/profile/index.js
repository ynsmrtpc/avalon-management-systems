import initialize from "@/pages/api/Models/ProfileModel";
import {getUserInfo} from "@/utils/getUserInfo";

export default async function handler(req, res) {
    const {UserInfo} = await initialize();
    let {attributes} = req.body
    attributes = attributes.split(",");
    const user_id = await getUserInfo(req, res);
    try {
        const data = await UserInfo.findOne({
            attributes: attributes,
            where: {
                id: user_id,
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
}

