import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Provinsi from './provinsi.model.js';

const { DataTypes } = Sequelize;
const KabupatenKota = db.define('kabupaten_kota', {
    id_kabupaten_kota: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nama_kabupaten_kota: {
        type: DataTypes.STRING(100)
    },
    id_provinsi: {
        type: DataTypes.BIGINT
    }
}, {
    timestamps: false,
    freezeTableName: true
})

KabupatenKota.belongsTo(Provinsi, {
    foreignKey: 'id_provinsi'
})

export default KabupatenKota;