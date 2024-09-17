"use server";

import connectToDB from "@/database";
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
