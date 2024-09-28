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

// Initialize Supabase client using environment variables
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
  const { toast } = useToast();
  const router = useRouter();

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

    const a = document.createElement("a");
    a.href = data.publicUrl;
    a.setAttribute("download", "resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpdateJobStatus = async (newStatus) => {
    let updatedApplications = [...jobApplications];

    const index = updatedApplications.findIndex(
      (item) => item?.candidateUserID === currentCandidateDetails?.userId
    );

    const updatedApplication = {
      ...updatedApplications[index],
      status: updatedApplications[index].status.concat(newStatus),
    };

    await updateJobApplicationData(updatedApplication, "/jobs");
  };

  const handleSelect = async () => {
    toast({
      title: `Candidate selected`,
      description: `Ohuu! Candidate is Selected 🥳`,
    });
    await handleUpdateJobStatus("selected");
    router.push("/jobs");
  };

  const handleReject = async () => {
    toast({
      variant: "destructive",
      title: `Candidate rejected`,
      description: `Upps! Candidate is rejected 😔`,
    });
    await handleUpdateJobStatus("rejected");
    router.push("/jobs");
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

      {currentCandidateDetails && (
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
            <div className="space-y-4">
              <h1 className="text-xl font-semibold text-gray-800">
                {currentCandidateDetails.candidateInfo.name}
              </h1>
              {/* Display candidate information */}
              <ul className="space-y-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <span className="text-gray-700">
                    {currentCandidateDetails.email}
                  </span>
                </li>
                {/* Additional candidate details here */}
              </ul>
            </div>

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
                  }
                >
                  {jobApplications
                    .find(
                      (item) =>
                        item?.candidateUserID ===
                        currentCandidateDetails?.userId
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
                  }
                >
                  {jobApplications
                    .find(
                      (item) =>
                        item?.candidateUserID ===
                        currentCandidateDetails?.userId
                    )
                    ?.status.includes("rejected")
                    ? "Rejected"
                    : "Reject"}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Fragment>
  );
}

export default CandidateList;
