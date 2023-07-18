import initialize from "@/pages/api/Models/SidebarModel";

export default async function modules(req, res) {
    const {SidebarMenu} = await initialize();
    let {id, moduleData, process, attributes} = req.body;
    moduleData = moduleData !== undefined ? JSON.parse(moduleData) : "";
    attributes = attributes !== undefined ? attributes.split(",") : "";
    let error = 0;
    let message = "";

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
                title: moduleData.title,
                icon: moduleData.icon,
                link: moduleData.link,
                queue: moduleData.queue,
                status: moduleData.status
            })
                .then(() => {
                    res.status(200).json({error: 0, message: "Kayıt başarılı", location: moduleData.link});
                })
                .catch(error => {
                    res.status(500).json({error: 1, message: `Kayıt eklenirken hata oluştu! ${error}`});
                });
            break;
        case "update":
            SidebarMenu.update({
                    title: moduleData.title,
                    icon: moduleData.icon,
                    link: moduleData.link,
                    queue: moduleData.queue,
                    status: moduleData.status
                },
                {
                    where: {
                        id: moduleData.id
                    }
                }
            )
                .then(() => {
                    res.status(200).json({error: error, message: message});
                })
                .catch(error => {
                    res.status(500).json({error: 1, message: `Güncelleme işlemi sırasında hata oluştu! ${error}`});
                });

            break;
        case "submodule":
            SidebarMenu.create({
                title: moduleData.title,
                icon: moduleData.icon,
                link: moduleData.link,
                queue: moduleData.queue,
                status: moduleData.status,
                parent_id: moduleData.id
            })
                .then(() => {
                    res.status(200).json({error: 0, message: "Kayıt başarılı", location: moduleData.link});
                })
                .catch(error => {
                    res.status(500).json({error: 1, message: `Kayıt eklenirken hata oluştu! ${error}`});
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
                    res.status(500).json({error: 1, message: `Silme işlemi sırasında hata oluştu! : ${error}` });
                });
            break;
    }
}