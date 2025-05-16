import { Sequelize } from "sequelize";
import db from '../config/db.config.js';

const { DataTypes } = Sequelize;
const JadwalPendaftaran = db.define('jadwal_pendaftaran', {
    id_jadwal_pendaftaran: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    tanggal_mulai: {
        type: 'TIMESTAMP'
    },
    tanggal_selesai: {
        type: 'TIMESTAMP'
    },
    kegiatan: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
})

export default JadwalPendaftaran;