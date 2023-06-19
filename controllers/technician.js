import Technician from "../models/Technician.js";
import generateToken from "../utils/generateToken.js";

export const authTechnician = async (req, res) => {
    try {
        const { email, password } = req.body;
        const technician = await Technician.findOne({ email });

        if(technician && (await technician.matchPassword(password))) {
            generateToken(res, technician._id);
            res.status(201).json({
                _id: technician._id,
                name: technician.name,
                email: technician.email
            });
        } else {
            res.status(401).json({message: "Invalid email or password"});
        }
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const registerTechnician = async (req, res) => {
    try {
        const {name, gender, experience_year, availability, specialization, certification, email, phoneNumber, address, password } = req.body;

        // check if user exists
        const technicianExists = await Technician.findOne({email});
        if(technicianExists) {
            res.status(400).json({message: "Technician already exists"});
        }
        // if user don't exists
        const technician = await Technician.create({
            name,
            gender, 
            experience_year, 
            availability, 
            specialization,
            email,
            password,
            phoneNumber,
            address,
            certification
        });

        // check if user created successful
        if(technician) {
            generateToken(res, technician._id);
            res.status(201).json({
                _id: technician._id,
                name: technician.name,
                email: technician.email,
                phoneNumber: technician.phoneNumber,
                address: technician.address,
                specialization: technician.specialization,
                experience_year: technician.experience_year,
                availability: technician.availability,
                certification: technician.certification,
                gender: technician.gender
            });
        } else {
            res.status(400).json({message: "Invalid Technician data"});
        }
    } catch(error) {
        res.status(409).json({message: error.message});
    }
}

export const logoutTechnician = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({message: "Technician logged out"});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const getTechnicianProfile = async (req, res) => {
    try {
        const technician = await Technician.findById(req.technician._id)
        if(technician) {
            res.status(200).json({
                name: technician.name,
                email: technician.email,
                phoneNumber: technician.phoneNumber,
                address: technician.address,
                specialization: technician.specialization,
                experience_year: technician.experience_year,
                availability: technician.availability,
                certification: technician.certification,
                gender: technician.gender
            });
        } else {
        res.status(404).json({message: "Technician not found"});
        }
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const updateTechnicianProfile = async (req, res) => {
    try {
        const technician = await Technician.findById(req.technician._id);

        // check if user exist
        if(technician) {
            technician.name = req.body.name || technician.name;
            technician.email = req.body.email || technician.email;
            technician.phoneNumber = req.body.phoneNumber || technician.phoneNumber;
            technician.address = req.body.address || technician.address;
            technician.specialization = req.body.specialization || technician.specialization;
            technician.experience_year = req.body.experience_year || technician.experience_year;
            technician.availability = req.body.availability || technician.availability;
            technician.certification = req.body.certification || technician.certification;
            technician.gender = req.body.gender || technician.gender
            if (req.body.password) {
                technician.password = req.body.password;
            }
            const updatedTechnician = await technician.save();
            res.status(200).json({
                _id: updatedTechnician._id,
                name: updatedTechnician.name,
                email: updatedTechnician.email,
                phoneNumber: updatedTechnician.phoneNumber,
                address: updatedTechnician.address,
                specialization: technician.specialization,
                experience_year: technician.experience_year,
                availability: technician.availability,
                certification: technician.certification,
                gender: technician.gender
            });
        } else {
            res.status(404).json({message: "Technician not found"});
        }
    } catch(error) {
        res.status(409).json({message: error.message});
    }
}

export const getAllTechnicians = async (req, res) => {
    try {
        const technicians = await Technician.find();
        res.status(200).json({technicians});
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}