import { Sequelize } from "sequelize";

const db = new Sequelize('library_system', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
});

export default db;