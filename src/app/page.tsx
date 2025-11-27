import RequestFormCard from "@/components/RequestForm";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Emergency Request App</h1>
      <RequestFormCard />
    </main>
  );
}
