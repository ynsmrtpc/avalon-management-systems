import initialize from "@/pages/api/Models/SidebarModel";
export default async function handler(req, res) {
    const { SidebarMenu } = await initialize();
    let {attributes} = req.body
    attributes = attributes.split(",");
    try {
        const data = await SidebarMenu.findAll({
            attributes: attributes, //['id', 'title', 'icon', 'link'],
            order: [['queue', 'ASC']],
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
