"use server";

import connectToDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

//create profile action

export const createProfile = async (formData, pathToRevalidate) => {
  try {
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
  } catch (error) {
    throw new Error(`Failed to create profile: ${error.message}`);
  }
};

export async function fetchProfileAction(id) {
  await connectToDB();
  const result = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(result));
}
// Update profile membership
export async function fetchProfileAndUpdateMembership(data, pathToRevalidate) {
  await connectToDB();

  const {
    role,
    email,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    userId,
  } = data;

  const result = await Profile.findOneAndUpdate(
    { userId },
    {
      userId,
      role,
      email,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
    },
    { new: true }
  );

  if (!result) {
    console.error("No data found for user:", userId);
  }

  revalidatePath(pathToRevalidate);
}

//create Job Action

export async function postNewJobAction(fromData, path) {
  await connectToDB();
  await Job.create(fromData);
  revalidatePath(path);
}

//fetch Job Action

//recruiter

export async function fetchJobForRecruiterAction(id) {
  await connectToDB();
  const result = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(result));
}

//candidate

export async function fetchJobForCandidateAction(filterParams = {}) {
  await connectToDB();
  let updatedParams = {};

  Object.keys(filterParams).forEach((filterKey) => {
    updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
  });

  const result = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
  );
  return JSON.parse(JSON.stringify(result));
}

// create job application

export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

// fetch job application - candidate

export async function fetchJobApplicationForCandidate(candidateID) {
  await connectToDB();
  const result = await Application.find({ candidateUserID: candidateID });
  return JSON.parse(JSON.stringify(result));
}

// fetch job application - recruiter

export async function fetchJobApplicationForRecruiter(recruiterID) {
  await connectToDB();
  const result = await Application.find({ recruiterUserID: recruiterID });
  return JSON.parse(JSON.stringify(result));
}

// update job application

export const updateJobApplicationData = async (data, pathToRevalidate) => {
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jonApplicationDate,
  } = data;

  await Application.findOneAndUpdate(
    { _id: _id },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jonApplicationDate,
    },
    { new: true }
  );

  revalidatePath(pathToRevalidate);
};

//get candidates details
export async function getCandidateDetailsByIDAction(currentCandidateID) {
  await connectToDB();

  const result = await Profile.findOne({ userId: currentCandidateID }).lean();

  return JSON.parse(JSON.stringify(result));
}

export async function FetchJobForActivityPage(JobId) {
  await connectToDB();
  const result = await Job.find({ _id: JobId });
  return JSON.parse(JSON.stringify(result));
}

// create filter Category

export async function createFilterCategoryAction() {
  await connectToDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
}

//update Profile Action
export async function updateProfileAction(data, pathToRevalidate) {
  try {
    await connectToDB();

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
    } = data;
    console.log(data, "data of Posts");

    // Check if required data exists
    if (!_id || !userId) {
      throw new Error("Profile ID and User ID are required.");
    }

    // Update the profile in the database
    const updatedProfile = await Profile.findOneAndUpdate(
      { _id },
      {
        userId,
        role,
        email,
        memberShipType,
        memberShipStartDate,
        memberShipEndDate,
        recruiterInfo,
        candidateInfo,
      },
      { new: true }
    );

    if (!updatedProfile) {
      throw new Error("Profile update failed.");
    }

    // Revalidate the path
    await revalidatePath(pathToRevalidate);
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw new Error(`Profile update failed: ${error.message}`);
  }
}
