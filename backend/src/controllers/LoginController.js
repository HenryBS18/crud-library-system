import User from "../database/models/User.js";

export const loginUser = async (req, res) => {
    try {
        const user = await fetch(`${process.env.BASE_API_URL}/users/email/${req.query.email}`)
            .then(res => res.json())
            .then(use => use)
            .catch(err => console.error(err));

        if (!user.found) {
            res.status(404).json({ status: false, message: "User not found" });
            return;
        }

        console.log(user);

        const response = await User.findOne({
            where: {
                email: req.query.email,
                password: req.query.password
            }
        });

        if (!response) {
            throw new Error('Wrong username or password');
        }

        res.status(200).json({
            status: true,
            payload: {
                login: true,
                user: {
                    id: response.user_id,
                    name: response.name,
                    email: response.email,
                    position: response.position,
                    faculty: response.faculty,
                    major: response.major
                }
            }
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}