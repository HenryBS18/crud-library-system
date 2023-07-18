import User from "../database/models/User.js";

export const registerUser = async (req, res) => {
    const user = {
        name: req.query.name,
        email: req.query.email,
        position: req.query.position,
        faculty: req.query.faculty,
        major: req.query.major,
        password: req.query.password
    };

    try {
        const response = await User.create(user);

        res.status(201).json({
            status: true,
            message: 'User created successfully',
            payload: { 
                user: response
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Failed to create user'
        });
    }
};