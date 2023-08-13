import initialize from "@/pages/api/Models/PortfolioModel";
export default async function handler(req, res) {
    const {CertificateModel} = await initialize();
    CertificateModel.findAll({
        order: [['certification_name', 'ASC']],
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`});
        });
}