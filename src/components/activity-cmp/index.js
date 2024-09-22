"use client";

import { fetchJobApplicationForCandidate } from "@/actions";
import { useEffect, useState } from "react";
import ActivityJobs from "../activity-jobs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

const ActivityPage = ({ id }) => {
  const [applications, setApplications] = useState([]);
  const [currentTab, setCurrentTab] = useState("appliedJob");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchApplicationData = async () => {
    try {
      const res = await fetchJobApplicationForCandidate(id);
      setApplications(res);
    } catch (err) {
      setError("Failed to fetch applications.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  useEffect(() => {
    fetchApplicationData();
  }, [id]);

  const filteredApplications = (status) => {
    return applications.filter((item) => item?.status.includes(status));
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>; // Loading message
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; // Error message
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="w-full">
        <div className="flex items-baseline justify-between border-b pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tighter text-gray-900">
            Applied Jobs
          </h1>
          <Tabs value={currentTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="appliedJob">Applied Jobs</TabsTrigger>
              <TabsTrigger value="selected">Selected</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="mt-8">
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          {/* Applied Jobs Tab */}
          <TabsContent value="appliedJob">
            <div className="grid gap-6">
              {applications && applications.length > 0 ? (
                applications.map((items, index) => (
                  <ActivityJobs
                    key={index}
                    JobId={items.jobID}
                    status={items.status}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No job applications found
                </p>
              )}
            </div>
          </TabsContent>

          {/* Selected Jobs Tab */}
          <TabsContent value="selected">
            <div className="grid gap-6">
              {filteredApplications("selected").length > 0 ? (
                filteredApplications("selected").map((items, index) => (
                  <ActivityJobs
                    key={index}
                    JobId={items.jobID}
                    status={items.status}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No selected job applications found
                </p>
              )}
            </div>
          </TabsContent>

          {/* Rejected Jobs Tab */}
          <TabsContent value="rejected">
            <div className="grid gap-6">
              {filteredApplications("rejected").length > 0 ? (
                filteredApplications("rejected").map((items, index) => (
                  <ActivityJobs
                    key={index}
                    JobId={items.jobID}
                    status={items.status}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No rejected job applications found
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ActivityPage;
