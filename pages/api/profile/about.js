import initialize from "@/pages/api/Models/ProfileModel";
import {getUserInfo} from "@/utils/getUserInfo";

export default async function handler(req, res) {
    const {UserInfo} = await initialize();
    const user_id = await getUserInfo(req, res);

    try {
       /*
       * portfolio için ayrı tablolar oluştur
       * portfolio_settings
       * portfolio_general_informations
       * portfolio_projects
       * portfolio_blogs
       * */
    } catch (error) {
        res.status(500).json({message: 'Veri çekme hatası:' + error});
    }
}

