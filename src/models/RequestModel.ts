
    //  Define the structure of a request document in MongoDB
    import mongoose, { Schema, model, models } from "mongoose";
    import { EmergencyRequest } from "@/types";
    
    const RequestSchema = new mongoose.Schema<EmergencyRequest>({
        name: { type: String, required: true },
        location: { type: String, required: true },
        emergencyType: { type: String, required: true },
        description: { type: String },
        contactInfo: { type: String, required: true },
        status: { type: String, enum: ["pending", "in-progress", "resolved"], default: "pending" },
    });
    
    export const Request = models.Request || model<EmergencyRequest>("Request", RequestSchema);
