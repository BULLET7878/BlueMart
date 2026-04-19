import jwt from "jsonwebtoken";

const authUser = async (req: any, res: any, next: any) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

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
