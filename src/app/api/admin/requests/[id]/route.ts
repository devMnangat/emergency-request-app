

    // Admin API route for updating status of a specific request by ID

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/mongoose/dbConnect";
import { Request as RequestModel } from "@/models/RequestModel";
import mongoose from "mongoose";


// update request by ID using patch method

// export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
//     try {
//         const { id } = await context.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
//         }

//         await dbConnect();

//         const body = await req.json();
//         const updatedRequest = await RequestModel.findByIdAndUpdate(id, body, { new: true });

//         if (!updatedRequest) {
//             return NextResponse.json({ error: "Request not found" }, { status: 404 });
//         }

//         return NextResponse.json({ message: "Request updated successfully", request: updatedRequest }, { status: 200 });
//     } catch (error) {
//         console.error("Error updating request:", error);
//         return NextResponse.json({ error: "Error updating request" }, { status: 500 });
//     }
// }


export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await dbConnect();
    const { status } = await req.json();

    if (!["resolved", "in-progress"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const updated = await RequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status updated",
      data: updated,
    });
  } catch (error) {
    console.error("ADMIN UPDATE REQUEST ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update request" },
      { status: 500 }
    );
  }
}
