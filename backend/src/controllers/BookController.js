import Book from "../database/models/Book.js";

export const getBooks = async (req, res) => {
    try {
        const response = await Book.findAll();

        const books = response.filter(book => book.is_deleted === false);

        res.status(200).json({
            payload: books
        });
    } catch (error) {
        console.error(error);
    }
}

export const getBookByID = async (req, res) => {
    try {
        const response = await Book.findOne({
            where: {
                book_id: req.params.id
            }
        });

        res.status(200).json({
            payload: {
                book: response
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const createBook = async (req, res) => {
    const book = {
        title: req.query.title,
        author: req.query.author,
        cover: req.query.cover,
        publisher: req.query.publisher,
        available_quantity: req.query.availableQuantity
    };

    try {
        const response = await Book.create(book);

        res.status(201).json({
            message: `${req.query.title} added to library!`,
            payload: response
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Failed to add book'
        });
    }
};

export const updateBook = async (req, res) => {
    const book = {
        title: req.query.title,
        author: req.query.author,
        cover: req.query.cover,
        publisher: req.query.publisher,
        available_quantity: req.query.availableQuantity,
        borrowed_quantity: req.query.borrowedQuantity,
        is_deleted: req.query.isDeleted
    };

    try {
        await Book.update(book, {
            where: {
                book_id: req.params.id
            }
        });

        res.status(200).json({
            message: 'Book updated successfully',
            payload: book
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Failed to update book'
        });
    }
};

export const deleteBookByID = async (req, res) => {
    try {
        await Book.update({ is_deleted: true }, {
            where: {
                book_id: req.params.id
            }
        });

        res.status(200).json({
            message: 'Book deleted successfully',
            payload: []
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}