import { DataTypes } from "sequelize";
import { connectToDatabase } from "@/pages/api/database";
import init_profile from "@/pages/api/Models/ProfileModel";

async function init_yet() {
    const db = await connectToDatabase();

    const CertificateModel = db.define("certifications", {
        certification_name: DataTypes.STRING,
        certification_url: DataTypes.STRING,
        certification_status: DataTypes.INTEGER,
    }, {
        tableName: 'certifications',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    const ProjectsModel = db.define("projects", {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        image_url: DataTypes.STRING,
        link: DataTypes.STRING,
        status: DataTypes.INTEGER
    }, {
        tableName: 'projects',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    const BlogsModel = db.define("medium_blogs", {
        title: DataTypes.STRING,
        readTime: DataTypes.STRING,
        imageURL: DataTypes.STRING,
        spot: DataTypes.STRING,
        url: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        status: DataTypes.INTEGER
    }, {
        tableName: 'medium_blogs',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    // init_profile fonksiyonundan UserInfo modelini alın
    const { UserInfo } = await init_profile();

    // Diğer model tanımlamaları...

    // BlogsModel ile UserInfo arasındaki ilişkiyi tanımlama
    BlogsModel.associate = models => {
        BlogsModel.belongsTo(models.UserInfo, { // UserInfo modelini doğru şekilde kullanın
            foreignKey: 'user_id'
        });
    };


    return {
        CertificateModel,
        ProjectsModel,
        BlogsModel,
        UserInfo
    };
}
export default init_yet;
