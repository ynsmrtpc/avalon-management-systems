import initialize from "@/pages/api/Models/PortfolioModel";

export default async function handler(req, res) {
    const {ProjectsModel} = await initialize();
    let {id, process, data} = req.body;
    data = data !== undefined ? JSON.parse(data) : "";

    let whereConditions = {};
    if (id) {
        whereConditions.id = id;
    }

    switch (process) {
        case "insert":
            await ProjectsModel.create({
                title: data.title,
                image_url: data.image_url,
                description: data.description,
                status: data.status,
                link: data.link
            })
                .then(() => res.status(200).json({error: 0, message: "Kayıt Başarılı"}))
                .catch(err => res.status(500).json({error: 1, message: `Kayıt hatası: ${err}`}))
            break;

        case "update":
            await ProjectsModel.update({
                    title: data.title,
                    image_url: data.image_url,
                    description: data.description,
                    status: data.status,
                    link: data.link
                },
                {
                    where: {
                        id: data.id
                    }
                })
                .then(() => res.status(200).json({error: 0, message: `Güncelleme işlemi başarılı`}))
                .catch(err => res.status(500).json({error: 1, message: `Güncelleme hatası: ${err}`}))
            break;

        case "delete":
            await ProjectsModel.destroy({
                where: {
                    id: id
                }
            })
                .then(() => res.status(200).json({error: 0, message: `Silme işlemi başarılı`}))
                .catch(err => res.status(500).json({error: 1, message: `Silme hatası ${err}`}))
            break;

        case "get":
            ProjectsModel.findAll({
                order: [['title', 'ASC']],
                where: [whereConditions]
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