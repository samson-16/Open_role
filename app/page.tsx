import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="text-center max-w-xl mx-auto">
        <div className="mb-8">
          <img
            src="/globe.svg"
            alt="Job Globe"
            className="mx-auto w-24 h-24 mb-4 drop-shadow-lg"
          />
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 leading-tight">
            Find Your Next <span className="text-blue-600">Opportunity</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Discover, apply, and track jobs tailored for you. Start your journey
            to a brighter career with our modern job application platform.
          </p>
          <Link href="/jobs" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200 inline-block">
            Browse Jobs
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>{" "}
            Curated Listings
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>{" "}
            Easy Application
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full"></span>{" "}
            Real-Time Updates
          </div>
        </div>
      </div>
    </main>
  );
}
