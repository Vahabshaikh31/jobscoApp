"use client";

import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";

export function JobListing({ user, profileInfo, jobList }) {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {profileInfo?.role === "candidate"
            ? "Explore All Jobs"
            : "Jobs Dashboard"}
        </h1>
        <div className="flex items-center space-x-4">
          {profileInfo?.role === "candidate" ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200">
              Filter Jobs
            </button>
          ) : (
            <PostNewJob user={user} profileInfo={profileInfo} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {jobList && jobList.length > 0 ? (
          jobList.map((jobItem, index) =>
            profileInfo?.role === "candidate" ? (
              <CandidateJobCard key={index} jobItem={jobItem} />
            ) : (
              <RecruiterJobCard key={index} jobItem={jobItem} />
            )
          )
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No jobs available
          </p>
        )}
      </div>
    </div>
  );
}
