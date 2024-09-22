import ActivityPage from "@/components/activity-cmp";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {" "}
      {/* Full-page styling */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        {" "}
        {/* Centered content box */}
        <ActivityPage id={user.id} />
      </div>
    </div>
  );
};

export default page;
