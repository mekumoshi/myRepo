import User from "../models/User.js";

export const authUser = async (req, res) => {
    try {
        res.status(200).json({message: "Auth User"});
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
            res.status(200).json({
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
        res.status(200).json({message: "Logout user"})
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
        res.status(201).json({message: "Update User profile"});
    } catch(error) {
        res.status(409).json({message: error.message});
    }
}