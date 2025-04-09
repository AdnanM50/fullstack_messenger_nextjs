import mongoose from "mongoose";
import { format } from "node:path";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
    varificationToken: { type: String },
    varificationTokenExpiry: { type: Date },
});

export const User = mongoose.model("User", userSchema);
// export type UserType = mongoose.InferSchemaType<typeof userSchema>;
// export type UserDocument = mongoose.Document & UserType;