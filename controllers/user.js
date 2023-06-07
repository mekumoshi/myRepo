import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            res.status(401).json({message: "Invalid email or password"});
        }
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const registerUser = async (req, res) => {
    try {
        const {name, email, phoneNumber, address, password} = req.body;

        // check if user exists
        const userExists = await User.findOne({email});
        if(userExists) {
            res.status(400).json({message: "User already exists"});
        }
        // if user don't exists
        const user = await User.create({
            name,
            email,
            password,
            phoneNumber,
            address
        });

        // check if user created successful
        if(user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address
            });
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch(error) {
        res.status(409).json({message: error.message});
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({message: "User logged out"});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const getUserProfile = async (req, res) => {
    try {
        res.status(200).json({message: "Get User Profile"});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // check if user exist
        if(user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            user.address = req.body.address || user.address;
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber,
                address: updatedUser.address
            });
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch(error) {
        res.status(409).json({message: error.message});
    }
}