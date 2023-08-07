import {getUserInfo} from "@/utils/getUserInfo";
export default async function deneme(req, res) {
    const user_id = await getUserInfo(req, res);
    res.status(200).json({user_id});
}