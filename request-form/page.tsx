

import RequestForm from "@/components/RequestForm";

const RequestFormPage = () => {
  const handleSubmit = (data: any) => {
    console.log("Submitted request:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <RequestForm onSubmit={handleSubmit} />
    </div>
  );
};

export default RequestFormPage;
