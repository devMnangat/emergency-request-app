

    "use client";

import { useEffect, useState } from "react";

type RequestType = {
  _id: string;
  name: string;
  location: string;
  emergencyType: string;
  description: string;
  contactInfo: string;
  status: "pending" | "in-progress" | "resolved";
    createdAt: string;
};

export default function AdminDashboard() {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL REQUESTS
  const fetchRequests = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/requests");
    const data = await res.json();
    setRequests(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // UPDATE STATUS ONLY
  const updateStatus = async (id: string, status: "in-progress" | "resolved") => {
    await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchRequests();
  };

  if (loading) return <p className="text-center mt-10">Loading requests...</p>;

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Admin Emergency Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests available.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="p-5 border rounded-lg shadow bg-white"
            >
              {/* TOP Section */}
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">{req.emergencyType}</h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    req.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : req.status === "in-progress"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              {/* TEXT DETAILS — READ ONLY */}
              <div className="mt-3 space-y-1 text-gray-700">
                <p><strong>Name:</strong> {req.name}</p>
                <p><strong>Phone:</strong> {req.contactInfo}</p>
                <p><strong>Location:</strong> {req.location}</p>
                <p><strong>Description:</strong> {req.description}</p>

                <p className="text-sm text-gray-500 mt-2">
                  Submitted: {new Date(req.createdAt).toLocaleString()}
                </p>
              </div>

              {/* ACTION BUTTONS — ONLY CHANGE STATUS */}
              <div className="flex gap-3 mt-4">
                {req.status !== "in-progress" && (
                  <button
                    onClick={() => updateStatus(req._id, "in-progress")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Mark In-Progress
                  </button>
                )}

                {req.status !== "resolved" && (
                  <button
                    onClick={() => updateStatus(req._id, "resolved")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
