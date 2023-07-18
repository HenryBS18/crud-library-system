import Borrow from "../database/models/Borrow.js";

export const getBorrows = async (req, res) => {
    try {
        const response = await Borrow.findAll({
            order: [['borrow_id', 'DESC']]
        });

        res.status(200).json({
            payload: response
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBorrowByID = async (req, res) => {
    try {
        const response = await Borrow.findOne({
            where: {
                borrow_id: req.params.id
            }
        });

        res.status(200).json({
            payload: {
                borrow: response
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllBorrowsByUser = async (req, res) => {
    try {
        const borrows = await Borrow.findAll({
            where: {
                user_id: req.params.id
            },
            order: [['borrow_id', 'DESC']]
        });

        res.status(200).json({
            payload: { borrows }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createBorrow = async (req, res) => {
    const book = await fetch(`${process.env.BASE_API_URL}/books/${req.query.bookID}`, {
        method: 'GET'
    }).then(res => res.json()).then(res => res.payload.book);

    const bookAvailableQuantity = book.available_quantity;

    if (req.query.quantity > bookAvailableQuantity) {
        res.status(400).json({ message: 'Book quantity is not enough' });
        return;
    }

    const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

    const borrow = {
        user_id: req.query.userID,
        book_id: req.query.bookID,
        book_quantity: req.query.quantity,
        borrow_date: today,
        return_date: req.query.returnDate
    };

    try {
        const response = await Borrow.create(borrow);

        const newQuantity = bookAvailableQuantity - req.query.quantity;
        const borrowedQuantity = book.borrowed_quantity + parseInt(req.query.quantity);

        const query = new URLSearchParams();
        query.append('availableQuantity', newQuantity);
        query.append('borrowedQuantity', borrowedQuantity);

        await fetch(`${process.env.BASE_API_URL}/books/${req.query.bookID}?${query}`, {
            method: 'PATCH',
        });

        res.status(201).json({
            message: 'Borrow created successfully',
            payload: response
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Failed to create borrow'
        });
    }
};

export const updateBorrow = async (req, res) => {
    const borrow = {
        user_id: req.query.userID,
        book_id: req.query.bookID,
        book_quantity: req.query.quantity,
        borrow_date: req.query.borrowDate,
        return_date: req.query.returnDate,
        actual_return_date: req.query.actualReturnDate
    };

    const getBorrow = await fetch(`${process.env.BASE_API_URL}/borrows/${req.params.id}`, {
        method: 'GET'
    }).then(res => res.json()).then(res => res.payload.borrow);

    const book = await fetch(`${process.env.BASE_API_URL}/books/${getBorrow.book_id}`, {
        method: 'GET'
    }).then(res => res.json()).then(res => res.payload.book);

    const userBorrowedQuantity = getBorrow.book_quantity;

    const bookAvailableQuantity = book.available_quantity + userBorrowedQuantity;
    const borrowedQuantity = book.borrowed_quantity - userBorrowedQuantity;

    try {
        await Borrow.update(borrow, {
            where: {
                borrow_id: req.params.id
            }
        });

        const query = new URLSearchParams();
        query.append('availableQuantity', bookAvailableQuantity);
        query.append('borrowedQuantity', borrowedQuantity);

        await fetch(`${process.env.BASE_API_URL}/books/${getBorrow.book_id}?${query}`, {
            method: 'PATCH'
        });

        res.status(200).json({
            message: 'Return book success',
            payload: borrow
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update borrow'
        });
    }
};

export const deleteBorrowByID = async (req, res) => {
    try {
        await Borrow.destroy({
            where: {
                borrow_id: req.params.id
            }
        });

        res.status(200).json({
            message: 'Borrow deleted successfully',
            payload: []
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete borrow'
        });
    }
}