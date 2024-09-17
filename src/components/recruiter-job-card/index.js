"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

function RecruiterJobCard({ jobItem }) {
  const { description, title } = jobItem;
  return (
    <h1>
      <CommonCard
        icon={<JobIcon />}
        title={title}
        description={description}
        footerContent={<Button>10 Applications</Button>}
      />
    </h1>
  );
}

export default RecruiterJobCard;
