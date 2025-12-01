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

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Fetch all requests
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

  // Update status
  const updateStatus = async (id: string, status: "in-progress" | "resolved") => {
    try {
      const res = await fetch(`/api/admin/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setRequests(prev => prev.filter(req => req._id !== id));
        triggerToast(`Request marked as ${status}`);
      } else {
        triggerToast("Failed to update request");
      }
    } catch {
      triggerToast("Error updating request");
    }
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
              {/* TOP */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
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

              {/* DETAILS */}
              <div className="mt-3 space-y-1 text-gray-700">
                <p><strong>Name:</strong> {req.name}</p>
                <p><strong>Phone:</strong> {req.contactInfo}</p>
                <p><strong>Location:</strong> {req.location}</p>
                <p><strong>Description:</strong> {req.description}</p>

                <p className="text-sm text-gray-500 mt-2">
                  Submitted: {new Date(req.createdAt).toLocaleString()}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-3 mt-4">
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

      {/* Custom toast like RequestFormCard */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fadeIn">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
