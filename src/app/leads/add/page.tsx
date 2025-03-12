"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = "https://leadflowbackend.onrender.com/api/lead";

export default function AddLeadPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("New");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const statuses = ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, status }),
            });

            const resData = await response.json();  // 👈 پاسخ رو پردازش کن
            console.log(resData); 
            
        
            if (response.ok) {
                setSuccess("Lead added successfully!");
                setName("");
                setEmail("");
                setStatus("New");
                router.push("/leads")
            } else {
                throw new Error("Failed to add lead");
            }
        } catch (err) {
            console.log(err);
            setError("Failed to add lead. Please try again.");
        }
        

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">➕ Add New Lead</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">Name *</label>
                        <input
                            type="text"
                            className="mt-1 w-full text-gray-700  p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">Email *</label>
                        <input
                            type="email"
                            className="mt-1 text-gray-800 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Status Field */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">Status</label>
                        <select
                            className="mt-1 text-gray-800 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {statuses.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    
                    {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
                    {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

                    <div className="flex flex-wrap justify-between mt-8">

                        {/* Back Button */}
                        <Link
                            href="/"
                            className="w-1/3  text-center text-gray-800 bg-blue-700 text-white py-3 rounded-lg shadow hover:bg-blue-800 transition disabled:bg-gray-400"
                        >
                            Back
                        </Link>

                        {/* Submit Button */}

                        <button
                            type="submit"
                            className="w-1/3 pointer-events-auto text-gray-800 bg-green-700 text-white py-3 rounded-lg shadow hover:bg-green-800 transition disabled:bg-gray-400"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Lead"}
                        </button>

                    </div>




                </form>
            </div>
        </div>
    );
}
