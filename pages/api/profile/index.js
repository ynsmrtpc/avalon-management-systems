import initialize from "@/pages/api/Models/ProfileModel";
export default async function handler(req, res) {
    const { UserInfo } = await initialize();
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