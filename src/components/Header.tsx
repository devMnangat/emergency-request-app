export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-linear-to-r from-red-500 to-red-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 text-center sm:text-left">
          Emergency Request App
        </h1>
        <p className="text-sm sm:text-base text-white/90 text-center sm:text-right">
          Report emergencies quickly and safely
        </p>
      </div>
    </header>
  );
}
