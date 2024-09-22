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
export async function fetchJobForCandidateAction() {
  await connectToDB();
  const result = await Job.find({});
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
