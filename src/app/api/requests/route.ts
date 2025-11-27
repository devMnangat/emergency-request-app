import { dbConnect } from "@/mongoose/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import { Request } from "@/models/RequestModel";

// Handle GET requests to fetch all emergency requests
export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const requests = await Request.find();
        return NextResponse.json({ requests });
    } catch (error) {
        console.error("Error fetching requests:", error);
        return NextResponse.json({ error: "Error fetching requests" }, { status: 500 });
    }
}

// Handle POST requests to create a new emergency request
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await dbConnect();
        const newRequest = new Request(body);
        await newRequest.save();
        return NextResponse.json({ message: "Request created successfully", request: newRequest }, { status: 201 });
    } catch (error) {
        console.error("Error creating request:", error);
        return NextResponse.json({ error: "Error creating request" }, { status: 500 });
    }
}