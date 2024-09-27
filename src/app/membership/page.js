import { fetchProfileAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { Fragment } from "react";
import MembershipCard from "@/components/membership-card";

const MembershipPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-100 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Choose Your Membership
        </h1>

        <p className="text-lg text-center text-gray-600 mb-16 px-4 md:px-0">
          Get access to premium features and unlock more job postings with our
          flexible membership plans. Whether you’re just starting or need
          unlimited access, we have a plan that suits your needs.
        </p>
        <div>
          <MembershipCard profileInfo={profileInfo} />
        </div>
      </div>
    </Fragment>
  );
};

export default MembershipPage;
