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
    const id = req.params.id;
    try {
        const service = await Service.findById(id);
        if (service) {
            res.status(200).json({service});
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const updateService = async (req, res) => {

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