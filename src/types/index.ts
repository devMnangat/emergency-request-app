
    export interface EmergencyRequest {
        _id?: string;
        name: string;
        location: string;
        emergencyType: string;
        description?: string;
        contactInfo: string;
        status: 'pending' | 'in-progress' | 'resolved';
    }