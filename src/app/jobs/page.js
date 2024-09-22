import { redirect } from "next/navigation";

const {
  fetchProfileAction,
  fetchJobForRecruiterAction,
  fetchJobForCandidateAction,
  fetchJobApplicationForCandidate,
  fetchJobApplicationForRecruiter,
} = require("@/actions");
const { JobListing } = require("@/components/job-listing");
const { currentUser } = require("@clerk/nextjs/server");

const JobsPage = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const profileInfo = await fetchProfileAction(user?.id);
  
  if (!profileInfo) {
    redirect("/onboard");
  }

  const jobList =
    profileInfo.role === "candidate"
      ? await fetchJobForCandidateAction()
      : await fetchJobForRecruiterAction(user?.id);

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationForCandidate(user?.id)
      : await fetchJobApplicationForRecruiter(user?.id);

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(profileInfo))}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={getJobApplicationList}
    />
  );
};
export default JobsPage;
