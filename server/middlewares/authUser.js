import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.json({
                success: false,
                message: "Not Authorized"
            });
        }


        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

export default authUser;
