export const recruiterOnboardFromControls = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter name",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter your company name",
    componentType: "input",
  },
  {
    label: "Company Role",
    name: "companyRole",
    placeholder: "Enter your company role",
    componentType: "input",
  },
];

export const initialRecruiterFromData = {
  name: "",
  companyName: "",
  companyRole: "",
};
export const candidateOnboardFromControls = [
  {
    label: "Resume",
    name: "resume",
    componentType: "file",
  },
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Current Job Location",
    name: "currentJobLocation",
    placeholder: "Enter your current job location",
    componentType: "input",
  },
  {
    label: "Preferred Job Location",
    name: "preferredJobLocation",
    placeholder: "Enter your preferred job location",
    componentType: "input",
  },
  {
    label: "Current Salary",
    name: "currentSalary",
    placeholder: "Enter your current salary",
    componentType: "input",
  },
  {
    label: "Notice Period",
    name: "noticePeriod",
    placeholder: "Enter your notice period",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter your skills",
    componentType: "input",
  },
  {
    label: "Previous Company",
    name: "previousCompany", // Fixed typo from 'Compony'
    placeholder: "Enter your previous company",
    componentType: "input",
  },
  {
    label: "Total Experience",
    name: "totalExperience",
    placeholder: "Enter your total experience",
    componentType: "input",
  },
  {
    label: "College",
    name: "college",
    placeholder: "Enter your college name",
    componentType: "input",
  },
  {
    label: "College Location",
    name: "collegeLocation", // Fixed the space in the key 'college Location'
    placeholder: "Enter your college location",
    componentType: "input",
  },
  {
    label: "Graduation Year",
    name: "graduatedYear", // Changed label to Graduation Year
    placeholder: "Enter your graduation year",
    componentType: "input",
  },
  {
    label: "LinkedIn Profile",
    name: "linkedinProfile",
    placeholder: "Enter your LinkedIn profile URL",
    componentType: "input",
  },
  {
    label: "GitHub Profile",
    name: "githubProfile",
    placeholder: "Enter your GitHub profile URL",
    componentType: "input",
  },
];

export const initialCandidateFromData = {
  name: "",
  currentJobLocation: "",
  preferredJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  previousCompany: "", // Fixed typo from 'Compony'
  totalExperience: "",
  college: "",
  collegeLocation: "", // Fixed the space in the key 'college Location'
  graduatedYear: "",
  linkedinProfile: "",
  githubProfile: "",
  resume: "",
};

export const PostNewJobFormData = [
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter Company Name",
    componentType: "input",
  },
  {
    label: "title",
    name: "title",
    placeholder: "Job title",
    componentType: "input",
  },
  {
    label: "Type",
    name: "type",
    placeholder: "Job Type",
    componentType: "input",
  },
  {
    label: "Location",
    name: "location",
    placeholder: "Job Location",
    componentType: "input",
  },
  {
    label: "Experience",
    name: "experience",
    placeholder: "Experience",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Description",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Skills",
    componentType: "input",
  },
];

export const initialPostNewJobFormControls = {
  title: "",
  type: "",
  location: "",
  companyName: "",
  experience: "",
  description: "",
  skills: "",
};
