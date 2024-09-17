import { fetchProfileAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);

  if (!user) {
    redirect("/sign-in");
  }

  if (user && !profileInfo?._id) {
    redirect("/onboard");
  }

  console.log("USER DATA: " + JSON.stringify(user));

  return <section>Main Content</section>;
}
