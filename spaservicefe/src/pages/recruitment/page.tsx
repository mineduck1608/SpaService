import React from "react";

export default function RecruitmentPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl rounded-lg bg-white p-10 shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800">Join Our Team</h1>
        <p className="mt-4 text-gray-600">
          Currently, we are not hiring for any positions. Please check back later
          for future opportunities.
        </p>
        <div className="mt-6">
          <img
            src="https://via.placeholder.com/500x300"
            alt="No jobs available"
            className="mx-auto rounded-lg"
          />
        </div>
        <p className="mt-4 text-gray-500">Stay connected with us for updates.</p>
      </div>
    </div>
  );
}
