import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"]
    },
    slug: String,
    phoneNumber: {
        type: String,
        required: [true, "Please add phone number"],
        unique: false,
        trim: true,
        maxlength: [10, "Name can not be more than 10 characters"]
    },
    address: {
        type: String,
        required: [true, "Please add your address"],
        unique: false,
        trim: true,
        maxlength: [50, "address can not be more than 50 characters"]
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "please add a valid email"
            ]
    },
    description: {
        type: String,
        required: [true, "Please add description"],
        unique: false,
        trim: true,
        maxlength: [100, "description can not be more than 50 characters"]
    },
    attachments: {
        type: String,
        default: "no-photo.jpg"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
         
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;