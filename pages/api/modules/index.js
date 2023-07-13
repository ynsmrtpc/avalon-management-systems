import initialize from "@/pages/api/Models/SidebarModel";
import {Op, where} from "sequelize";

export default async function modules(req, res) {
    const {SidebarMenu} = await initialize();
    let {id, status, process, attributes} = req.body;
    attributes = attributes.split(",");
    switch (process) {
        case "get":
            if (id === undefined) {
                SidebarMenu.findAll({
                    attributes: attributes,
                    order: [['queue', 'ASC']],
                })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`});
                    });
            } else {
                SidebarMenu.findOne({
                    attributes: attributes,
                    where: {
                        id: id
                    }
                })
                    .then(data => {
                        res.status(200).json(data)
                    })
                    .catch(error => {
                        res.status(500).json({error: 0, message: `Kayıt getirilirken hata oluştu! ${error}`})
                    });
            }
            break;

        case "insert":
            SidebarMenu.create({
                title: title,
                icon: icon,
                link: link,
                queue: queue,
                status: status
            })
                .then(() => {
                    res.status(200).json({error: 0, message: "Kayıt başarılı"});
                })
                .catch(error => {
                    res.status(500).json({error: 0, message: `Kayıt eklenirken hata oluştu! ${error}`});
                });
            break;

        case "update":
            SidebarMenu.update({
                    title: title,
                    icon: icon,
                    link: link,
                    queue: queue,
                    status: status
                },
                {
                    where: {
                        id: id
                    }
                }
            )
                .then(() => {
                    res.status(200).json({error: 0, message: 'Güncelleme Başarılı'});
                })
                .catch(error => {
                    res.status(500).json({error: 1, message: `Güncelleme işlemi sırasında hata oluştu! ${error}`});
                });
            break;

        case "delete":
            SidebarMenu.destroy({
                where: {
                    id: id
                }
            })
                .then(() => {
                    res.status(200).json({error: 0, message: "Silme işlemi başarılı"});
                })
                .catch(error => {
                    res.status(500).json({error: 1, message: "Silme işlemi sırasında hata oluştu!"});
                });
            break;
    }
}