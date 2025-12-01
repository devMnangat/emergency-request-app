

    // API route for the admin

    import { NextResponse } from "next/server";
    import { dbConnect } from "@/mongoose/dbConnect";
    import { Request as RequestModel } from "@/models/RequestModel";


    // Get all requests as admin

   

export async function GET() {
  try {
    await dbConnect();

    const requests = await RequestModel.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("ADMIN GET REQUESTS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}