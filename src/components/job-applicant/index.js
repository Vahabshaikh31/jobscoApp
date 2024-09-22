"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import CandidateList from "../candidate-List";
import { Drawer, DrawerContent } from "../ui/drawer";

function JobApplications({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  jobItem,
  jobApplications,
}) {
  return (
    <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
      <DrawerContent className="max-h-[50vh]">
        <ScrollArea className=" h-auto overflow-y-auto">
          <CandidateList
            currentCandidateDetails={currentCandidateDetails}
            setCurrentCandidateDetails={setCurrentCandidateDetails}
            jobApplications={jobApplications}
            showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
            setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
            jobItem={jobItem}
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default JobApplications;
