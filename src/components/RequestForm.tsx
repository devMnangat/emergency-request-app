"use client";

import { useState } from "react";
import { EmergencyRequest } from "@/types";

interface RequestFormCardProps {
  isAdmin?: boolean;
}

const RequestFormCard: React.FC<RequestFormCardProps> = ({ isAdmin = false }) => {
  const [form, setForm] = useState<EmergencyRequest>({
    name: "",
    location: "",
    emergencyType: "",
    description: "",
    contactInfo: "",
    status: "pending",
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      setForm({
        name: "",
        location: "",
        emergencyType: "",
        description: "",
        contactInfo: "",
        status: "pending",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting request. Please try again.");
    }
  };

  return (
    <div className="relative max-w-md w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Emergency Request Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Emergency Type</label>
          <input
            type="text"
            name="emergencyType"
            value={form.emergencyType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Info</label>
          <input
            type="text"
            name="contactInfo"
            value={form.contactInfo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
        </div>

        {isAdmin && (
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition-colors"
        >
          Submit Request
        </button>
      </form>

      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fadeIn">
          Request submitted successfully!
        </div>
      )}
    </div>
  );
};

export default RequestFormCard;
