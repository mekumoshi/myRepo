import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const TechnicianSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name"],
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"]
    },
    gender: {
        type: String,
        required: [true, "Please add your gender"],
        trim: true
    },
    experience_year: {
        type: Number,
        required: [true, "Please add year of experience"],
        trim: true
    },
    specialization: {
        type: [String],
        required: [true, "Add specialization"]
    },
    languages: {
        type: [String],
        required: [true, "Please add languages"]
    },
    availability: {
        type: String,
        required: [true, "Add your availability schedule"]
    },
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
            ],
        unique: true
    },
    certification: {
        type: [String],
        required: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});

// password encryption
TechnicianSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

TechnicianSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const Technician = mongoose.model("Technician", TechnicianSchema);

export default Technician;