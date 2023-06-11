import {connectToDatabase} from "@/pages/api/database";
export default async function handler(req, res) {
    const db = await connectToDatabase();
    const query = "SELECT instagram, facebook, twitter, tiktok, youtube, linkedin, github from users_social_media where user_id=1";
    const [rows] = await db.query(query);
    const socialMediaData = JSON.stringify(rows);
    res.status(200).json(socialMediaData);
}