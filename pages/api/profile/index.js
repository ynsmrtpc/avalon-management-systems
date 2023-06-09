import {connectToDatabase} from "@/pages/api/database";

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const query = `SELECT name_surname, email, profile_photo from system_users where id=1`;
    const [rows] = await db.query(query);
    const profileData = JSON.stringify(rows);
    res.status(200).json(profileData);
}