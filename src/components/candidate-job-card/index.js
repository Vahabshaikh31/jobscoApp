"use client";

import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { createJobApplicationAction } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";

const CandidateJobCard = ({
  jobItem,
  profileInfo,
  jobApplications,
  JobCount,
}) => {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);
  const { toast } = useToast();

  const { companyName, title, location, type, experience, skills } = jobItem;
  const router = useRouter();

  // Check if the candidate has already applied for this job
  const isAlreadyApplied = jobApplications.some(
    (application) => application.jobID === jobItem._id
  );

  const handleUpgradeToast = (planType) => {
    return toast({
      variant: "destructive",
      title: `Upgrade Required`,
      description: `You have reached the limit for the ${planType} plan.`,
      action: (
        <ToastAction
          altText="Upgrade"
          onClick={() => router.push("/membership")}
        >
          Upgrade
        </ToastAction>
      ),
    });
  };

  // Handles job application submission with membership validation
  const handleJobApply = async () => {
    const { memberShipType } = profileInfo;

    if (
      (memberShipType === "" && JobCount >= 3) ||
      (memberShipType === "Basic" && JobCount >= 10) ||
      (memberShipType === "Standard" && JobCount >= 20)
    ) {
      return handleUpgradeToast(memberShipType || "free");
    }

    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobItem._id,
        jobApplicationDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );

    setShowJobDetailsDrawer(false);
  };

  return (
    <Fragment>
      {/* Job Card */}
      <CommonCard
        icon={<JobIcon />}
        title={title}
        description={companyName}
        footerContent={
          <Button
            onClick={() => setShowJobDetailsDrawer(true)}
            className="bg-blue-600 border rounded-md p-2 text-white hover:bg-blue-700 transition-all duration-300"
          >
            View Details
          </Button>
        }
        className="shadow-md hover:shadow-lg transition-shadow rounded-lg bg-white p-4"
      />

      {/* Job Details Drawer */}
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
        className="bg-gray-50 shadow-lg"
      >
        <DrawerContent className="p-6 space-y-6">
          <DrawerHeader className="flex justify-between items-center border-b pb-4">
            <DrawerTitle className="text-3xl font-bold text-gray-900">
              {title}
            </DrawerTitle>
            <DrawerClose
              onClick={() => setShowJobDetailsDrawer(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </DrawerClose>
          </DrawerHeader>

          <DrawerDescription className="text-gray-700">
            <p className="mt-2">
              <span className="font-semibold">Location: </span>
              {location}
            </p>
            <p>
              <span className="font-semibold">Job Type: </span>
              {type}
            </p>
            <p>
              <span className="font-semibold">Experience Required: </span>
              {experience} years
            </p>
          </DrawerDescription>

          {/* Skills Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Required Skills
            </h3>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {skills?.split(",").map((skillItem, index) => (
                <li
                  key={index}
                  className="bg-gray-200 text-gray-800 rounded-md px-3 py-1 text-sm"
                >
                  {skillItem}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              className={`${
                isAlreadyApplied
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } text-white px-4 py-2 rounded-md transition`}
              onClick={handleJobApply}
              disabled={isAlreadyApplied}
            >
              {isAlreadyApplied ? "Applied" : "Apply"}
            </Button>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => setShowJobDetailsDrawer(false)}
            >
              Cancel
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default CandidateJobCard;
