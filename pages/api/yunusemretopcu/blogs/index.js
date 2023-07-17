import initialize from "@/pages/api/Models/CertificateModel";
export default async function handler(req, res) {
    const {BlogsModel} = await initialize();
    BlogsModel.findAll({
        order: [['title', 'ASC']],
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`});
        });
}