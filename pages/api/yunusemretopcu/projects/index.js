import initialize from "@/pages/api/Models/CertificateModel";

export default async function handler(req, res) {
    const {ProjectsModel} = await initialize();
    const {id} = req.body;

    let whereCondition = {};
    if (id) {
        whereCondition.id = id;
    }

    ProjectsModel.findAll({
        order: [['title', 'ASC']],
        where: [whereCondition]
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`});
        });
}