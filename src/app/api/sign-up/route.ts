import { User } from "@/models/User";
import { connectDb } from "@/utils/db";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { username, email, password } = data;

    if (!username || !email || !password) {
        return NextResponse.json({
            message: "Please provide all the fields",
            error: true,
        });
    }

    await connectDb();

    const alreadyUser = await User.findOne({
        $or: [{ username: username }, { email: email }],
    });
    if (alreadyUser) {
        return NextResponse.json({
            message: "Email or Username is already registered",
            error: true,
        });
    }

    const hashedPass = await hash(password, 12);
    const newUser = await User.create({
        username,
        email,
        password: hashedPass,
    });

    return NextResponse.json({
        message: "Account created successfully",
        error: false,
        username: newUser.username,
    });
}
