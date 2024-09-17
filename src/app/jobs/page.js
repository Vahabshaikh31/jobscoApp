import { redirect } from "next/navigation";

const {
  fetchProfileAction,
  fetchJobForRecruiterAction,
  fetchJobForCandidateAction,
} = require("@/actions");
const { JobListing } = require("@/components/job-listing");
const { currentUser } = require("@clerk/nextjs/server");

const JobsPage = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const profileInfo = await fetchProfileAction(user?.id);

  const jobList =
    profileInfo.role === "candidate"
      ? await fetchJobForCandidateAction()
      : await fetchJobForRecruiterAction(user?.id);

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(profileInfo))}
      profileInfo={profileInfo}
      jobList={jobList}
    />
  );
};
export default JobsPage;
