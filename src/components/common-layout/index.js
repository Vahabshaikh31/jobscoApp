import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions";

export async function CommonLayout({ children }) {
  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);

  return (
    <div className=" mx-auto max-w-9xl ">
      {/* Header Component */}
      <Header profileInfo={profileInfo} user={user} />

      <main className="flex justify-center items-center max-w-full w-full">
        {children}
      </main>
    </div>
  );
}
