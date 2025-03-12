"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/30 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-lg text-center border border-white/20">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-md">
          Welcome to LeadFlow 🚀
        </h1>
        <p className="text-lg text-white/80 mt-3">
          Manage your leads efficiently with our sleek interface.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={() => router.push("/leads")}
            className="cursor-pointer px-6 py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all rounded-full shadow-lg hover:shadow-blue-500/50"
          >
            View Leads
          </button>

          <button
            onClick={() => router.push("/leads/add")}
            className="cursor-pointer px-6 py-3 text-lg font-semibold text-white bg-green-700 hover:bg-green-800 transition-all rounded-full shadow-lg hover:shadow-green-500/50"
          >
            
            + Add Lead
          </button>
        </div>

    
      </div>
    </div>
  );
}
