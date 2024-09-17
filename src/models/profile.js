const { default: mongoose } = require("mongoose");

const profileSchema = mongoose.Schema({
  userId: String,
  role: String,
  email: String,
  memberShipType: String,
  memberShipStartDate: String,
  memberShipEndDate: String,
  recruiterInfo: {
    name: String,
    companyName: String,
    companyRole: String,
  },
  candidateInfo: {
    name: String,
    currentJobLocation: String,
    preferredJobLocation: String,
    currentSalary: String,
    noticePeriod: String,
    skill: String,
    currentCompony: String,
    previousCompanies: Array,
    totalExperience: String,
    college: String,
    collegeLocation: String,
    graduatedYear: String,
    linkedinProfile: String,
    githubProfile: String,
    resume: String,
  },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
