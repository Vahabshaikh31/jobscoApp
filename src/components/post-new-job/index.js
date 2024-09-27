"use client";
import { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormControls, PostNewJobFormData } from "@/utils";
import { postNewJobAction } from "@/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const PostNewJob = ({ profileInfo, user, JobCount }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [showJobDialog, setShowJobDialog] = useState(false);

  const initialFormState = {
    ...initialPostNewJobFormControls,
    companyName: profileInfo?.recruiterInfo?.companyName || "",
  };

  const [jobFormData, setJobFormData] = useState(initialFormState);

  // Memoize function to avoid unnecessary re-creations
  const handlePostBtnValid = useCallback(() => {
    return Object.values(jobFormData).every((field) => field.trim() !== "");
  }, [jobFormData]);

  const resetFormData = useCallback(() => {
    setJobFormData(initialFormState);
  }, [initialFormState]);

  const createNewJob = async () => {
    await postNewJobAction(
      {
        ...jobFormData,
        recruiterId: user?.userId,
        applicants: [],
      },
      "/jobs"
    );
    resetFormData();
    setShowJobDialog(false);
  };
  const handleUpgradeToast = (planType) => {
    toast({
      variant: "destructive",
      title: `Need To upgrade`,
      description: `You have reached the limit for the ${planType} plan.`,
      action: <ToastAction altText="Upgrade Pan">Upgrade</ToastAction>,
    });
    router.push("/membership");
  };

  const handleMebership = async () => {
    if (profileInfo.memberShipType === "" && JobCount >= 5) {
      handleUpgradeToast(profileInfo.memberShipType || "free");
      return;
    }

    if (profileInfo.memberShipType === "Basic" && JobCount >= 10) {
      handleUpgradeToast(profileInfo.memberShipType || "free");
      return;
    }

    if (profileInfo.memberShipType === "Standard" && JobCount >= 20) {
      handleUpgradeToast(profileInfo.memberShipType || "free");
      return;
    }
    setShowJobDialog(true);
  };

  return (
    <div>
      {/* Button to open the job post dialog */}
      <Button
        onClick={handleMebership}
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
                buttonText="Add"
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
