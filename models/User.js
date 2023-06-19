import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name"],
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"]
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
    role: {
        type: String,
        enum: ["user", "technician"],
        default: "user"
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "please add a valid email"
            ],
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});

// password encryption
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", UserSchema);

export default User;