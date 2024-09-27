"use client";

import { useState, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";

import CommonForm from "../common-form";
import {
  candidateOnboardFromControls,
  initialCandidateFromData,
  initialRecruiterFromData,
  recruiterOnboardFromControls,
} from "@/utils";

import { createProfile } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://hynxzzlhphnnhyqlhjfk.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bnh6emxocGhubmh5cWxoamZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NzEyMDUsImV4cCI6MjA0MjA0NzIwNX0.Fpmy61-5_E1w6NFraPcruUeKLixDLMWfx-ahx9Hi1AM"
);
function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");

  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFromData
  );

  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFromData
  );

  const [file, setFile] = useState(null);

  const { user } = useUser();

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  async function handleUploadToSupabase() {
    if (!file) return;

    const { data, error } = await supabaseClient.storage
      .from("job-board-public")
      .upload(`public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Failed to upload file", error.message);
      return;
    }

    if (data) {
      setCandidateFormData({
        ...candidateFormData,
        resume: data.path,
      });
    }
  }

  useEffect(() => {
    if (file) {
      handleUploadToSupabase();
    }
  }, [file]);

  function handleRecruiterFormValid() {
    return Object.values(recruiterFormData).every(
      (field) => field.trim() !== ""
    );
  }

  function handleCandidateFormValid() {
    return Object.values(candidateFormData).every(
      (field) => field.trim() !== ""
    );
  }

  const createProfileAction = async () => {
    try {
      const data =
        currentTab === "candidate"
          ? {
              candidateInfo: {
                name: candidateFormData.name,
                currentJobLocation: candidateFormData.currentJobLocation,
                preferredJobLocation: candidateFormData.preferredJobLocation,
                currentSalary: candidateFormData.currentSalary,
                noticePeriod: candidateFormData.noticePeriod,
                skill: candidateFormData.skills,
                currentCompany: candidateFormData.previousCompany,
                previousCompanies: [],
                totalExperience: candidateFormData.totalExperience,
                college: candidateFormData.college,
                collegeLocation: candidateFormData.collegeLocation,
                graduatedYear: candidateFormData.graduatedYear,
                linkedinProfile: candidateFormData.linkedinProfile,
                githubProfile: candidateFormData.githubProfile,
                resume: candidateFormData.resume,
              },
              role: "candidate",
              isPremiumUser: false,
              userId: user?.id,
              email: user?.primaryEmailAddress?.emailAddress,
              memberShipType: "",
              memberShipStartDate: "",
              memberShipEndDate: "",
            }
          : {
              recruiterInfo: {
                name: recruiterFormData.name,
                companyName: recruiterFormData.companyName,
                companyRole: recruiterFormData.companyRole,
              },
              role: "recruiter",
              isPremiumUser: false,
              userId: user?.id,
              email: user?.primaryEmailAddress?.emailAddress,
              memberShipType: "",
              memberShipStartDate: "",
              memberShipEndDate: "",
            };
      console.log("All ADat  :", data);

      await createProfile(data, "/");
    } catch (error) {
      console.error("Failed to create profile", error.message);
    }
  };

  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tighter text-gray-900">
              Welcome to onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <CommonForm
            formControls={candidateOnboardFromControls}
            buttonText="Onboard as a candidate"
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            handleFileChange={handleFileChange}
            // isBtnDisabled={!handleCandidateFormValid()}
            action={createProfileAction}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterOnboardFromControls}
            buttonText="Onboard as recruiter"
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            // isBtnDisabled={!handleRecruiterFormValid()}
            action={createProfileAction}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OnBoard;
