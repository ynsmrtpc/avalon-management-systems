import initialize from "@/pages/api/Models/ProfileModel";
export default async function handler(req, res) {
    const { UsersSocialMedia } = await initialize();
    let {process, attributes} = req.body
    attributes = attributes.split(",");
    let message = "";
    switch (process) {
        case "social_media_add":
            if (req.method === 'POST') {
                const {url, socialMedia} = req.body

                try {
                    await UsersSocialMedia.update({[socialMedia]: url}, {
                        where: {user_id: 1},
                    });
                    message = "Kayıt Başarılı";
                } catch (error) {
                    message = 'Bir hata oluştu:' + error;
                }
                res.status(200).json(message);
            }
            break;

        case "social_media_get":
            try {
                const data = await UsersSocialMedia.findOne({
                    attributes: attributes,
                    where: {
                        user_id: 1
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
            break;

    }
}