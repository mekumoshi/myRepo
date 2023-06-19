import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "Please add user id"],
        unique: true,
    },
    technician_id:{
        type: String
    },
    slug: {
        type: String
    },
    address: {
        type: String,
        required: [true, "Please add your address"],
        unique: false,
        trim: true,
        maxlength: [50, "address can not be more than 50 characters"]
    },
    service_type: {
        type: String,
        required: [true, "Please add service type"],
        trim: true
    },
    service_date: {
        type: Date,
        required: [true, "Please add date"],
        default: Date.now()
    },
    description: {
        type: String,
        required: [true, "Please add description"],
        unique: false,
        trim: true,
        maxlength: [100, "description can not be more than 50 characters"]
    },
    status: {
        type: String,
        required: [true, "Please add status"],
        enum: ["low", "medium", "high"]
    },
    notes: {
        type: String,
        trim: true,
        maxlength: [100, "notes can not be more than 100 characters"]
    },
    priority: {
        type: String,
        required: [true, "Please add priority level"]
    },
    rating: {
        type: String,
    },
    comment: {
        type: String
    },
    photo: {
        type: String,
        default: "no-photo"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
         
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;