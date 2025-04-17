import { connectDB } from "@/db/dbConfig";
import { User } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({ message: "Please provide all fields" }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const tokendata = {
            id: user._id,
            username: user.name,
            email: user.email
        };
        const token = await jwt.sign(
            tokendata,
            process.env.SECRET as string,
            { expiresIn: "1h" }
        );


     const respons = NextResponse.json({
            message: "Login successful",
            success: true,
            // token: token,
            // user: {
            //     id: user._id,
            //     name: user.name,
            //     email: user.email
            // }
        });
        respons.cookies.set("token", token, { httpOnly: true });
        return respons;
        
        
   
    } catch (error: any) {
        console.error("Error in login route:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}