import { dbConnect } from "@/mongoose/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { Request as RequestModel } from "@/models/RequestModel";

// Helper: Validate ObjectId
function validateId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
            { error: "Invalid ID format" },
            { status: 400 }
        );
    }
}

// GET - Fetch specific emergency request by ID
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const invalid = validateId(id);
        if (invalid) return invalid;

        await dbConnect();

        const request = await RequestModel.findById(id);
        if (!request) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }

        return NextResponse.json({ request }, { status: 200 });
    } catch (error) {
        console.error("Error fetching request:", error);
        return NextResponse.json({ error: "Error fetching request" }, { status: 500 });
    }
}

// PUT - Update request by ID
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const invalid = validateId(id);
        if (invalid) return invalid;

        await dbConnect();

        const body = await req.json();
        const updatedRequest = await RequestModel.findByIdAndUpdate(id, body, { new: true });

        if (!updatedRequest) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Request updated successfully", request: updatedRequest },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating request:", error);
        return NextResponse.json({ error: "Error updating request" }, { status: 500 });
    }
}

// DELETE - Remove request by ID
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const invalid = validateId(id);
        if (invalid) return invalid;

        await dbConnect();

        const deletedRequest = await RequestModel.findByIdAndDelete(id);

        if (!deletedRequest) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Request deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting request:", error);
        return NextResponse.json({ error: "Error deleting request" }, { status: 500 });
    }
}
