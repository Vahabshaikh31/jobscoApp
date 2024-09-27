import { fetchProfileAction } from "@/actions";
import HandelSubscriptionPage from "@/components/subscriptionPage";
import { currentUser } from "@clerk/nextjs/server";
export default async function Widget({ params }) {
  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);

  return (
    <HandelSubscriptionPage
      params={params}
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
    />
  );
}
