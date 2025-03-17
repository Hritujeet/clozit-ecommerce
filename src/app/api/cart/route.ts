import {NextResponse} from "next/server";
import {auth} from "@/auth";

export async function GET() {
    const userSession = await auth()
    console.log(userSession)
    return NextResponse.json({message: "success"});
}