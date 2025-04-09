import { connectDB } from "@/db/dbconfig";
import { User } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { console } from "inspector";


connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { name, email, password } = reqBody;

        console.log("Request body:", reqBody);

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Please provide all fields" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
       const savedUser = await newUser.save();
        console.log("User created successfully:", savedUser);
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });
    } catch (error: any) {
        console.error("Error in signup route:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        
    }
}