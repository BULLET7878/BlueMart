import jwt from "jsonwebtoken";

interface DecodedToken extends jwt.JwtPayload {
    email?: string;
    id?: string;
}

const authSeller = async (req: any, res: any, next: any) => {
    try {
        const { sellerToken } = req.cookies;

        if (!sellerToken) {
            return res.json({
                success: false,
                message: "Not Authorized"
            });
        }

        const decoded = jwt.verify(
            sellerToken,
            process.env.JWT_SECRET as string
        ) as DecodedToken;

        if (decoded.email !== process.env.SELLER_EMAIL) {
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

export default authSeller;


