import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;
const DayaTampung = db.define('daya_tampung', {
    id_daya_tampung: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING(100)
    },
    daya_tampung: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default DayaTampung;