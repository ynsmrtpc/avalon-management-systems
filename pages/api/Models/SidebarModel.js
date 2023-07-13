import { DataTypes } from "sequelize";
import { connectToDatabase } from "@/pages/api/database";
async function initialize() {
    const db = await connectToDatabase();
    const SidebarMenu = db.define('modules', {
        title: DataTypes.STRING,
        icon: DataTypes.STRING,
        link: DataTypes.STRING,
        queue: DataTypes.INTEGER,
    }, {
        tableName: 'modules',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });
    return {
        SidebarMenu,
    };
}
export default initialize;
