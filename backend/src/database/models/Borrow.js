import { DataTypes } from "sequelize";
import db from "../config/mysql.js";
import User from "./User.js";
import Book from "./Book.js";

const Borrow = db.define('borrow', {
    borrow_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'book_id'
        }
    },
    book_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    borrow_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    return_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    actual_return_date: {
        type: DataTypes.DATEONLY,
        defaultValue: null
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

export default Borrow;