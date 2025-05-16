import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import GrupUser from './grup_user.model.js';

const { DataTypes } = Sequelize;
const User = db.define('user', {
    id_user: {
        type: DataTypes.STRING(100),
        primaryKey: true,        
    },
    username: {
        type: DataTypes.STRING(100)
    },
    password: {
        type: DataTypes.STRING(100)
    },
    fullname: {
        type: DataTypes.STRING(100)
    },
    nomor_telepon: {
        type: DataTypes.STRING(100)
    },
    alamat: {
        type: DataTypes.TEXT
    },
    foto: {
        type: DataTypes.STRING
    },
    jenis_kelamin: {
        type: DataTypes.INTEGER
    },
    id_grup_user: {
        type: DataTypes.INTEGER
    }
},{
    timestamps: false,
    freezeTableName: true
})

User.belongsTo(GrupUser, { foreignKey: 'id_grup_user' })

export default User;