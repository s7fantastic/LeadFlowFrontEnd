import { Lead } from "@/types/lead";
import Link from "next/link";

// Fetch leads from API (server-side)
async function getLeads() {
  
  const res = await fetch("https://leadflowbackend.onrender.com/api/lead", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch leads");
  }

  return res.json();
}

export default async function LeadsPage() {
  const leads = await getLeads();
  console.log(leads);
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">📋 Leads List</h1>
          <Link
            href="/leads/add"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
           Add New Lead
          </Link>
        </div>

        {leads.length === 0 ? (
          <p className="text-center text-gray-500">⛔ No leads found.</p>
        ) : (
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead:Lead) => (
                <tr
                  key={lead._id}
                  className="border-b text-gray-500 hover:bg-gray-100 transition"
                >
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        lead.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : lead.status === "Engaged"
                          ? "bg-green-100 text-green-700"
                          : lead.status === "Proposal Sent"
                          ? "bg-yellow-100 text-yellow-700"
                          : lead.status === "Closed-Won"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-3">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
