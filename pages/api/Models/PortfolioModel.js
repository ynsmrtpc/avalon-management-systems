import {DataTypes} from "sequelize";
import {connectToDatabase} from "@/pages/api/database";

async function init_portfolio() {
    const db = await connectToDatabase();

    const CertificateModel = db.define("certifications", {
        certification_name: DataTypes.STRING,
        certification_url: DataTypes.STRING,
        certification_status: DataTypes.INTEGER,
    }, {
        tableName: 'certifications',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    const ProjectsModel = db.define("portfolio_projects", {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        image_url: DataTypes.STRING,
        link: DataTypes.STRING,
        status: DataTypes.INTEGER
    }, {
        tableName: 'portfolio_projects',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    const BlogsModel = db.define("portfolio_blogs", {
        title: DataTypes.STRING,
        readTime: DataTypes.STRING,
        imageURL: DataTypes.STRING,
        spot: DataTypes.STRING,
        url: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        status: DataTypes.INTEGER
    }, {
        tableName: 'portfolio_blogs',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    const GeneralInfoModel = db.define("portfolio_general_information", {
        user_id: DataTypes.INTEGER,
        about: DataTypes.TEXT,
        interests: DataTypes.STRING,
        mail_address: DataTypes.STRING
    }, {
        tableName: 'portfolio_general_information',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    const SocialMediaModel = db.define('portfolio_social_media', {
        facebook: DataTypes.STRING,
        github: DataTypes.STRING,
        instagram: DataTypes.STRING,
        linkedin: DataTypes.STRING,
        tiktok: DataTypes.STRING,
        twitter: DataTypes.STRING,
        youtube: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        tableName: 'portfolio_social_media',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    const PortfolioSkillsModel = db.define("portfolio_skills",{
        skill: DataTypes.STRING,
        stars: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER
    },{
        tableName: 'portfolio_skills',
        timestamps: false,
    })

    return {
        CertificateModel,
        ProjectsModel,
        BlogsModel,
        GeneralInfoModel,
        SocialMediaModel,
        PortfolioSkillsModel
    };
}

export default init_portfolio;
