"use client";
import { FetchJobForActivityPage } from "@/actions";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JobIcon from "../job-icon";

const ActivityJobs = ({ JobId, status }) => {
  const [AppliedJobDetails, setAppliedJobDetails] = useState([]);

  const FetchJobDetails = async (id) => {
    const res = await FetchJobForActivityPage(id);
    setAppliedJobDetails(res);
  };

  useEffect(() => {
    FetchJobDetails(JobId);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {AppliedJobDetails.length > 0 ? (
        AppliedJobDetails.map((item, index) => (
          <Card
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            <CardHeader className="p-4">
              {/* Directly render JobIcon without unnecessary condition */}
              <div className="mb-3">
                <JobIcon />
              </div>

              {item.title && (
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {item.title}
                </CardTitle>
              )}
              {item.description && (
                <CardDescription className="text-sm text-gray-600 mt-2">
                  {item.description}
                </CardDescription>
              )}
              <span
                className={`inline-block px-3 py-1 mt-3 text-sm font-medium rounded-lg ${
                  status.includes("selected")
                    ? "bg-green-100 text-green-800"
                    : status.includes("rejected")
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {status.includes("selected")
                  ? "Selected"
                  : status.includes("rejected")
                  ? "Rejected"
                  : "Pending"}
              </span>
            </CardHeader>

          
          </Card>
        ))
      ) : (
        <p className="text-gray-500 text-center">No jobs found</p>
      )}
    </div>
  );
};

export default ActivityJobs;
