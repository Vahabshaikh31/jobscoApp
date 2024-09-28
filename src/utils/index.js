import qs from "query-string";

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

export const initialRecruiterFormData = {
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
    name: "skill",
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

export const initialCandidateFormData = {
  name: "",
  currentJobLocation: "",
  preferredJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  previousCompany: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
  graduatedYear: "",
  linkedinProfile: "",
  githubProfile: "",
  resume: "",
};

export const initialCandidateAccountForm = {
  name: "",
  currentJobLocation: "",
  preferredJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  previousCompany: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
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

export const filterMenuDataArray = [
  {
    id: "companyName",
    label: "Company Name",
  },
  {
    id: "title",
    label: "Title",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "location",
    label: "Location",
  },
];

export function fromUrlQuery({ params, dataToAdd }) {
  let currentURL = qs.parse(params);

  if (Object.keys(dataToAdd).length > 0) {
    Object.keys(dataToAdd).forEach((key) => {
      if (dataToAdd[key].length === 0) {
        delete currentURL[key];
      } else {
        currentURL[key] = dataToAdd[key].join(",");
      }
    });

    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentURL,
      },
      {
        skipNull: true,
      }
    );
  }
}

export const MemberShipCardsForRecruiter = [
  {
    img: "https://img.freepik.com/premium-vector/game-level-up-shield-badge-win-icon-bonus-award_8071-53691.jpg",
    alt: "Basic Plan",
    title: "Basic",

    description:
      "Basic membership offers limited access to our platform. you can post only 10 jobs ",
    price: "10",
    button: "Subscribe",
  },
  {
    img: "https://img.freepik.com/premium-vector/game-level-badge-gui-interface-golden-banner-with-flags-vector-icon-2-level-up-badge-with-ribbon-golden-crest-video-game-arcade-level-achievement-gamer-popup-congrats_8071-58312.jpg",
    title: "Standard",
    description:
      "Standard membership offers unlimited access to our platform. you can post 20 jobs ",
    price: "50",
    button: "Subscribe",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWC_ePsWFETslNjKtXVysDTItR-uxpaaaP7w&s",
    alt: "Premium Plan",
    title: "Premium",
    description:
      "Premium membership offers unlimited access to our platform. you can post unlimited jobs ",
    price: "100",
    button: "Subscribe",
  },
];

export const MemberShipCardsForCandidate = [
  {
    img: "https://img.freepik.com/premium-vector/game-level-up-shield-badge-win-icon-bonus-award_8071-53691.jpg",
    alt: "Basic Plan",
    title: "Basic",

    description:
      "Basic membership offers limited access to our platform. you can Apply only 5 jobs ",
    price: "10",
    button: "Subscribe",
  },
  {
    img: "https://img.freepik.com/premium-vector/game-level-badge-gui-interface-golden-banner-with-flags-vector-icon-2-level-up-badge-with-ribbon-golden-crest-video-game-arcade-level-achievement-gamer-popup-congrats_8071-58312.jpg",
    title: "Standard",
    description:
      "Standard membership offers unlimited access to our platform. you can Apply only 10 jobs ",
    price: "50",
    button: "Subscribe",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWC_ePsWFETslNjKtXVysDTItR-uxpaaaP7w&s",
    alt: "Premium Plan",
    title: "Premium",
    description:
      "Premium membership offers unlimited access to our platform. you can Apply unlimited jobs ",
    price: "100",
    button: "Subscribe",
  },
];
