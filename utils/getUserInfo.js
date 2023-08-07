import initialize from "@/pages/api/Models/ProfileModel";

export async function getUserInfo(req) {
    const {UserInfo} = await initialize();

    const cookies = req.headers.cookie;
    const token = cookies ?
        cookies.split(";")
            .find(cookie => cookie.trim().startsWith("login_token="))
            .split("=")[1] : null;

    try {
        const data = await UserInfo.findOne({
            attributes: ["id"],
            where: {
                login_token: token,
            }
        });
        if (data) {
            return data.id;
        }
    } catch (error) {
        return error;
    }

}