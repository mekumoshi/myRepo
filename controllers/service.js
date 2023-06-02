import Service from "../models/Service.js";

export const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

export const getService = async (req, res) => {
    const id = req.body.id;
    try {
        const service = await Service.findById(id);
        res.status(200).json({service});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createService = async (req, res) => {
    const service = req.body;
    const newService = new Service(service);
    try {
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
    }
}