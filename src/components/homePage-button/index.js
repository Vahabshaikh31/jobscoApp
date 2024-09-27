"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function HomepageButtonControls({ user, profileInfo }) {
  const router = useRouter();

  return (
    <div className="space-y-4 lg:space-y-0 lg:space-x-4 flex flex-col lg:flex-row">
      {/* Button for Browsing Jobs or Dashboard */}
      <Button
        onClick={() => router.push("/jobs")}
        className="flex items-center justify-center px-5 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 rounded-md"
      >
        {user
          ? profileInfo.role === "candidate"
            ? "Browse Jobs"
            : "Jobs Dashboard"
          : "Find Jobs"}
      </Button>

      {/* Button for Activity or Posting Jobs */}
      <Button
        onClick={() =>
          router.push(
            user
              ? profileInfo.role === "candidate"
                ? "/activity"
                : "/jobs"
              : "/jobs"
          )
        }
        className="flex items-center justify-center px-5 py-2 bg-green-500 text-white hover:bg-green-600 transition-all duration-300 rounded-md"
      >
        {user
          ? profileInfo.role === "candidate"
            ? "Your Activity"
            : "Post New Jobs"
          : "Post New Jobs"}
      </Button>
    </div>
  );
}

export default HomepageButtonControls;
