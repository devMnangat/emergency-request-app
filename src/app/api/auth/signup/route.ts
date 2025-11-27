


    import { NextResponse } from "next/server";
    import bcrypt from "bcryptjs";
    import { dbConnect } from "@/mongoose/dbConnect";
    import User from "@/models/UserModel";

    export async function POST(req: Request) {
      try {
        const body = await req.json();
        const { name, email, password, role } = body;
        await dbConnect();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
      } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
      }
    }



