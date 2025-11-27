
  "use client";

import RequestFormCard, { RequestFormData } from "@/components/RequestForm";

export default function HomePage() {
  const handleSubmit = (data: RequestFormData) => {
    console.log("Submitted request:", data);
    // Call your API to save the request
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
      <RequestFormCard onSubmit={handleSubmit} />
    </div>
  );
}
