import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import User from './user.model.js';
import JenjangAsalSekolah from './jenjang_asal_sekolah.model.js';
import DayaTampung from './daya_tampung.model.js';

const { DataTypes } = Sequelize;
const Pendaftaran = db.define('pendaftaran', {
    id_pendaftaran: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    no_pendaftaran: {
        type: DataTypes.STRING(100)
    },
    nik: {
        type: DataTypes.STRING(100)
    },
    nama_siswa: {
        type: DataTypes.STRING(100)
    },
    jenis_kelamin: {
        type: DataTypes.INTEGER
    },
    tempat_lahir: {
        type: DataTypes.STRING(100)
    },
    tanggal_lahir: {
        type: 'DATE'
    },
    nama_orang_tua: {
        type: DataTypes.STRING(100)
    },
    nomor_telepon: {
        type: DataTypes.STRING(100)
    },
    alamat: {
        type: DataTypes.TEXT
    },
    id_jenjang_asal_sekolah: {
        type: DataTypes.STRING(100)
    },
    nama_asal_sekolah: {
        type: DataTypes.STRING(100)
    },
    tahun_lulus: {
        type: DataTypes.INTEGER(10)
    },
    id_user: {
        type: DataTypes.STRING(100)
    },
    dok_bukti_pembayaran: {
        type: DataTypes.STRING
    },
    dok_kk: {
        type: DataTypes.STRING
    },
    dok_akta: {
        type: DataTypes.STRING
    },
    dok_ijazah: {
        type: DataTypes.STRING
    },
    dok_ktp_orang_tua: {
        type: DataTypes.STRING
    },
    dok_foto: {
        type: DataTypes.STRING
    },
    waktu_daftar: {
        type: 'TIMESTAMP'
    },
    is_diterima: {
        type: DataTypes.INTEGER(10)
    },
    waktu_diterima: {
        type: 'TIMESTAMP'
    },
    id_daya_tampung: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Pendaftaran.belongsTo(User, {
    foreignKey: 'id_user'
})

Pendaftaran.belongsTo(JenjangAsalSekolah, {
    foreignKey: 'id_jenjang_asal_sekolah'
})

Pendaftaran.belongsTo(DayaTampung, {
    foreignKey: 'id_daya_tampung'
})
export default Pendaftaran;