import { DataTypes } from "sequelize";
import db from "../config/mysql.js";

const Book = db.define('book', {
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publisher: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    available_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    borrowed_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

db.sync()
    .then(() => {
        console.log('Tables created successfully.');
    })
    .catch((error) => {
        console.error('Error creating tables:', error);
    });

export default Book;