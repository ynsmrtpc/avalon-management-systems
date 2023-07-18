import {DataTypes} from "sequelize";
import {connectToDatabase} from "@/pages/api/database";

async function initialize() {
    const db = await connectToDatabase();
    const SidebarMenu = db.define('modules', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        queue: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        parent_id: DataTypes.INTEGER
    }, {
        tableName: 'modules',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });
    return {
        SidebarMenu,
    };
}

export default initialize;
