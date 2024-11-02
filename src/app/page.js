import { fetchProfileAction } from "@/actions";
import HomepageButtonControls from "@/components/homePage-button";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) {
    redirect("/onboard");
  }

  return (
    <Fragment>
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 text-center lg:text-left space-y-6">
              <span className="block w-14 h-1 bg-red-200 mx-auto lg:mx-0"></span>
              <h1 className="text-4xl md:text-6xl font-bold">
                The Best <br />
                Job Portal App
              </h1>
              <p className="text-lg md:text-xl">
                Find the Jobs from Top Product-Based Companies and Build Your
                Career
              </p>
              <div className="mt-8 space-y-4 lg:space-y-0 lg:space-x-4">
                <HomepageButtonControls
                  user={JSON.parse(JSON.stringify(user))}
                  profileInfo={profileInfo}
                />
              </div>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <img
                className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-lg"
                src="https://shorturl.at/msw07"
                alt="Job Portal"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
