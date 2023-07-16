import { DataTypes } from "sequelize";
import { connectToDatabase } from "@/pages/api/database";

async function initialize() {
    const db = await connectToDatabase();

    const CertificateModel = db.define("certifications", {
        certification_name: DataTypes.STRING,
        certification_url: DataTypes.STRING,
        certification_status: DataTypes.INTEGER,
    }, {
        tableName: 'certifications',
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    });

    return {
        CertificateModel,
    };
}
export default initialize;
