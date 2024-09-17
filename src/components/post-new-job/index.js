import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormControls, PostNewJobFormData } from "@/utils";
import { postNewJobAction } from "@/actions";

const PostNewJob = ({ profileInfo, user }) => {
  const [showJobDialog, setShowJobDialog] = useState(false);

  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormControls,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  console.log(profileInfo?.recruiterInfo?.companyName);

  function handlePostBtnValid() {
    return Object.values(jobFormData).every((field) => field.trim() !== "");
  }

  async function createNewJob() {
    await postNewJobAction(
      {
        ...jobFormData,
        recruiterId: user?.userId,
        applicants: [],
      },
      "/jobs"
    );

    setJobFormData({
      ...initialPostNewJobFormControls,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });

    setShowJobDialog(false);
  }

  return (
    <div>
      <Button
        onClick={() => setShowJobDialog(true)}
        className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
      >
        Post A Job
      </Button>

      {/* Dialog for posting the job */}
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="sm:max-w-screen-md h-[400px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                buttonText={"Add"}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={PostNewJobFormData}
                isBtnDisabled={!handlePostBtnValid()}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostNewJob;
