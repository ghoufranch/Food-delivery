import { response } from 'express';
import jwt from 'jsonwebtoken'


//take the token convert to user id with the user id we can remove or add items to the cart

const authMiddleware = async (req,res,next) => {
    const { token } = req.headers;
    if (!token) {   
        return response.json({ success: false, message: "Unauthorized login again" }) 
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return response.json({ success: false, message: "Error" })
    }
}

export default authMiddleware;