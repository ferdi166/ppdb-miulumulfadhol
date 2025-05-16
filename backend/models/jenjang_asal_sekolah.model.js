import { Sequelize } from "sequelize";
import db from '../config/db.config.js';

const { DataTypes } = Sequelize;
const JenjangAsalSekolah = db.define('jenjang_asal_sekolah', {
    id_jenjang_asal_sekolah: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    slug: {
        type: DataTypes.STRING(100)
    },
    nama: {
        type: DataTypes.STRING(100)
    }
}, {
    timestamps: false,
    freezeTableName: true
})

export default JenjangAsalSekolah;