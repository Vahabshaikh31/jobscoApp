"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import {
  getCandidateDetailsByIDAction,
  updateJobApplicationData,
} from "@/actions";
import { DialogTitle } from "@radix-ui/react-dialog";
import { createClient } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const supabaseClient = createClient(
  "https://hynxzzlhphnnhyqlhjfk.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bnh6emxocGhubmh5cWxoamZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NzEyMDUsImV4cCI6MjA0MjA0NzIwNX0.Fpmy61-5_E1w6NFraPcruUeKLixDLMWfx-ahx9Hi1AM"
);

function CandidateList({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  jobItem,
  jobApplications,
}) {
  const handleFetchCandidateDetails = async (getCurrentCandidateID) => {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateID);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  };

  const handlePreviewResume = async () => {
    const { data } = supabaseClient.storage
      .from("job-board-public")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

    console.log(data);

    const a = document.createElement("a");
    a.href = data.publicUrl;
    a.setAttribute("download", "resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpdateJobStatus = async (getCurrentStatus) => {
    let cpyJobApplicants = [...jobApplications];

    const indexOfCurrentJobApplication = cpyJobApplicants.findIndex(
      (item) => item?.candidateUserID === currentCandidateDetails?.userId
    );

    const jobApplicationsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplication],
      status:
        cpyJobApplicants[indexOfCurrentJobApplication].status.concat(
          getCurrentStatus
        ),
    };
    await updateJobApplicationData(jobApplicationsToUpdate, "/jobs");
  };
  const { toast } = useToast();
  const router = useRouter();

  const handleSelect = async () => {
    toast({
      title: `Candidate selected`,
      description: `Ohuu! Candidate is Selected 🥳`,
    });
    handleUpdateJobStatus("selected");
  };
  router.push("/jobs");
  const handleReject = async () => {
    toast({
      variant: "destructive",
      title: `Candidate rejected`,
      description: `Upps! Candidate is rejected 😔`,
    });
    router.push("/jobs");

    handleUpdateJobStatus("rejected");
  };

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0 ? (
          jobApplications.map((jobApplication) => (
            <div
              key={jobApplication?.candidateUserID}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-sm rounded-lg overflow-hidden"
            >
              <div className="px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {jobApplication?.name}
                </h3>
                <Button
                  onClick={() =>
                    handleFetchCandidateDetails(jobApplication?.candidateUserID)
                  }
                  className="flex h-10 items-center justify-center px-5 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No applications found.</p>
        )}
      </div>

      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
          <DialogTitle className="text-2xl font-bold text-gray-800 mb-4">
            Candidate Information
          </DialogTitle>
          {currentCandidateDetails && (
            <div className="space-y-4">
              <h1 className="text-xl font-semibold text-gray-800">
                {currentCandidateDetails.candidateInfo.name}
              </h1>
              <ul className="space-y-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <span className="text-gray-700">
                    {currentCandidateDetails.email}
                  </span>
                </li>
                <li>
                  <strong>College:</strong>{" "}
                  <span className="text-gray-700">
                    {currentCandidateDetails.candidateInfo.college}
                  </span>
                </li>
                <li>
                  <strong>College Location:</strong>{" "}
                  <span className="text-gray-700">
                    {currentCandidateDetails.candidateInfo.collegeLocation}
                  </span>
                </li>
                <li>
                  <strong>Graduation Year:</strong>{" "}
                  <span className="text-gray-700">
                    {currentCandidateDetails.candidateInfo.graduatedYear}
                  </span>
                </li>
                <li>
                  <strong>Current Job Location:</strong>{" "}
                  <span className="text-gray-700">
                    {currentCandidateDetails.candidateInfo.currentJobLocation}
                  </span>
                </li>
                <li>
                  <strong>Current Salary:</strong>{" "}
                  <span className="text-gray-700">
                    {currentCandidateDetails.candidateInfo.currentSalary}
                  </span>
                </li>
                <li>
                  <strong>Notice Period:</strong>{" "}
                  <span className="text-gray-700">
                    {currentCandidateDetails.candidateInfo.noticePeriod}
                  </span>
                </li>
                <li>
                  <strong>Preferred Job Location:</strong>{" "}
                  <span className="text-gray-700">
                    {currentCandidateDetails.candidateInfo.preferredJobLocation}
                  </span>
                </li>
                <li>
                  <strong>Total Experience:</strong>{" "}
                  <span className="text-gray-700">
                    {currentCandidateDetails.candidateInfo.totalExperience}
                  </span>
                </li>
                <li>
                  <strong>Skills:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentCandidateDetails?.candidateInfo.skill
                      ?.split(",")
                      .map((skillItem, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 rounded-md px-3 py-1 text-sm"
                        >
                          {skillItem}
                        </span>
                      ))}
                  </div>
                </li>
                <li>
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href={currentCandidateDetails.candidateInfo.linkedinProfile}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {currentCandidateDetails.candidateInfo.linkedinProfile}
                  </a>
                </li>
                <li>
                  <strong>GitHub:</strong>{" "}
                  <a
                    href={currentCandidateDetails.candidateInfo.githubProfile}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {currentCandidateDetails.candidateInfo.githubProfile}
                  </a>
                </li>
                <li>
                  <strong>Previous Companies:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentCandidateDetails?.candidateInfo.previousCompanies
                      ? currentCandidateDetails?.candidateInfo.previousCompanies.map(
                          (company, index) => (
                            <span
                              key={index}
                              className="bg-gray-200 text-gray-800 rounded-md px-3 py-1 text-sm"
                            >
                              {company}
                            </span>
                          )
                        )
                      : "N/A"}
                  </div>
                </li>
              </ul>
            </div>
          )}
          <DialogFooter>
            <div className="flex gap-3">
              <Button onClick={handlePreviewResume}>Resume</Button>
              <Button
                onClick={handleSelect}
                className="disabled:opacity-70"
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item?.candidateUserID ===
                        currentCandidateDetails?.userId
                    )
                    ?.status.includes("selected") ||
                  jobApplications
                    .find(
                      (item) =>
                        item?.candidateUserID ===
                        currentCandidateDetails?.userId
                    )
                    ?.status.includes("rejected")
                    ? true
                    : false
                }
              >
                {jobApplications
                  .find(
                    (item) =>
                      item?.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected")
                  ? "Selected"
                  : "Select"}
              </Button>
              <Button
                className="disabled:opacity-75"
                onClick={handleReject}
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item?.candidateUserID ===
                        currentCandidateDetails?.userId
                    )
                    ?.status.includes("selected") ||
                  jobApplications
                    .find(
                      (item) =>
                        item?.candidateUserID ===
                        currentCandidateDetails?.userId
                    )
                    ?.status.includes("rejected")
                    ? true
                    : false
                }
              >
                {jobApplications
                  .find(
                    (item) =>
                      item?.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? "rejected"
                  : "reject"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default CandidateList;
