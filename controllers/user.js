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
        res.status(201).json({message: "Register User"});
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