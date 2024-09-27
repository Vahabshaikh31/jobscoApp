"use client";

import { useState, useEffect } from "react";
import CommonCard from "../common-card";
import JobApplications from "../job-applicant";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

function RecruiterJobCard({ jobItem, jobApplications, profileInfo }) {
  const { companyName, title } = jobItem;

  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);

  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  return (
    <h1>
      <CommonCard
        icon={<JobIcon />}
        title={title}
        description={companyName}
        footerContent={
          <Button onClick={() => setShowApplicantsDrawer(true)}>
            {
              jobApplications.filter((items) => items.jobID === jobItem._id)
                .length
            }{" "}
            Applicants
          </Button>
        }
        jobApplications={jobApplications}
      />
      <JobApplications
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        jobItem={jobItem}
        jobApplications={jobApplications.filter(
          (jobApplications) => jobApplications.jobID === jobItem._id
        )}
      />
    </h1>
  );
}

export default RecruiterJobCard;
