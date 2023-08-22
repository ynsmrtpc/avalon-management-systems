import { DataTypes } from "sequelize";
import { connectToDatabase } from "@/pages/api/database";

 async function init_profile() {
    const db = await connectToDatabase();

    const UserInfo = db.define("system_users", {
        name_surname: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        login_token: DataTypes.STRING,
        title: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        profile_photo: DataTypes.STRING,
    }, {
        tableName: 'system_users',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    const UsersSocialMedia = db.define('users_social_media', {
        facebook: DataTypes.STRING,
        github: DataTypes.STRING,
        instagram: DataTypes.STRING,
        linkedin: DataTypes.STRING,
        tiktok: DataTypes.STRING,
        twitter: DataTypes.STRING,
        youtube: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        tableName: 'users_social_media',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    return {
        UserInfo,
        UsersSocialMedia,
    };
}

export default init_profile;
