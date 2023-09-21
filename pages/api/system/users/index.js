import { json } from "body-parser";
import init_profile from "../../Models/ProfileModel";

export default async function users(req, res) {
  const { UserInfo } = await init_profile();
  let { action } = req.body;

  switch (action) {
    case "get":
      UserInfo.findAll({
        order: [["name_surname", "asc"]],
      })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(500).json({
            error: 0,
            message: `Kayıt getirilirken hata oluştu! ${error}`,
          });
        });
      break;
  }
}
