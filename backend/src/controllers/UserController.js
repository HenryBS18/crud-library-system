import User from "../database/models/User.js";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll();

        res.status(200).json({
            payload: response
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const getUserByID = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                user_id: req.params.id
            }
        });

        res.status(200).json({
            payload: {
                user: response
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                email: req.params.email
            }
        });

        if (!response) {
            res.status(404).json({
                found: false,
                message: 'User not found'
            });
            return;
        }

        res.status(200).json({
            found: true,
            payload: {
                user: response
            }
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const updateUser = async (req, res) => {
    const user = {
        name: req.query.name,
        position: req.query.position,
        faculty: req.query.faculty,
        major: req.query.major,
        password: req.query.password
    };

    try {
        await User.update(user, {
            where: {
                user_id: req.query.id
            }
        });

        res.status(200).json({
            message: 'User updated successfully',
            payload: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Failed to update user'
        });
    }
};

export const deleteUserByID = async (req, res) => {
    try {
        await User.destroy({
            where: {
                user_id: req.params.id
            }
        });

        res.status(200).json({
            message: 'User deleted successfully',
            payload: []
        });
    } catch (error) {
        console.error(error.message);
    }
}