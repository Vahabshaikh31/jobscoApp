"use client";

import {
  candidateOnboardFromControls,
  initialCandidateAccountForm,
  initialCandidateFormData, // Typo fixed
  initialRecruiterFormData, // Typo fixed
  recruiterOnboardFromControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";
import { useToast } from "@/hooks/use-toast";

const AccountInfo = ({ profileInfo }) => {
  const { toast } = useToast();

  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateAccountForm
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  useEffect(() => {
    if (profileInfo?.role === "recruiter") {
      setRecruiterFormData(profileInfo?.recruiterInfo);
    }
    if (profileInfo?.role === "candidate") {
      setCandidateFormData(profileInfo?.candidateInfo);
    }
  }, [profileInfo]);

  const {
    userId,
    role,
    email,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = profileInfo;

  const handleUpdateAccount = async (e) => {
    const res = await updateProfileAction(
      profileInfo?.role === "candidate"
        ? {
            userId,
            role,
            email,
            memberShipType,
            memberShipStartDate,
            memberShipEndDate,
            candidateInfo: {
              ...candidateFormData,
              resume: profileInfo?.candidateInfo?.resume,
            },
            recruiterInfo,
            _id,
          }
        : {
            userId,
            role,
            email,
            memberShipType,
            memberShipStartDate,
            memberShipEndDate,
            recruiterInfo: {
              ...recruiterFormData,
            },
            candidateInfo,
            _id,
          },
      "/account"
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {" "}
      {/* Styled container */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Account Details
      </h1>{" "}
      {/* Styled header */}
      <div className="space-y-6">
        {" "}
        {/* Added spacing between form sections */}
        <CommonForm
          action={handleUpdateAccount}
          formControls={
            profileInfo?.role === "recruiter"
              ? recruiterOnboardFromControls
              : candidateOnboardFromControls.filter(
                  (formControl) => formControl.name !== "resume"
                )
          }
          formData={
            profileInfo?.role === "recruiter"
              ? recruiterFormData
              : candidateFormData
          }
          setFormData={
            profileInfo?.role === "recruiter"
              ? setRecruiterFormData
              : setCandidateFormData
          }
          buttonText={"Update Profile"}
        />
      </div>
    </div>
  );
};

export default AccountInfo;
