import jwt from "jsonwebtoken";
import Technician from "../models/technician.js";


const protectTechnician = async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.technician = await Technician.findById(decoded.technicianId).select("-password");
            next();
        } catch(error) {
           res.status(401).json({message: "Not authorized, invalid token"}); 
        }
    } else {
        res.status(401).json({message: "Not authorized, no token"});
    }
}

export { protectTechnician };