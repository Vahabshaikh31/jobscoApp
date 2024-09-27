"use client";
import { fetchProfileAndUpdateMembership } from "@/actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";

const HandleSubscriptionPage = ({ params, profileInfo }) => {
  const [TodayDate, setTodayDate] = useState({ today: "", oneMonthLater: "" });
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });

  const router = useRouter();
  const { toast } = useToast();

  const { role, email, recruiterInfo, candidateInfo, userId } = profileInfo;

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const today = formatDate(new Date());
    const oneMonthLater = formatDate(
      new Date(new Date().setMonth(new Date().getMonth() + 1))
    );
    setTodayDate({ today, oneMonthLater });
  }, []);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleUpgradeToast = (planType) => {
    toast({
      variant: "success",
      title: `Payment SuccessFull`,
      description: `Upgraded To  ${planType} plan.`,
      action: <ToastAction altText="Upgrade To Plan">Upgrade</ToastAction>,
    });
    router.push("/membership");
  };

  const handleSubscription = async (e) => {
    e.preventDefault();

    await fetchProfileAndUpdateMembership(
      {
        role,
        userId,
        email,
        recruiterInfo,
        candidateInfo,
        memberShipType: params?.subscription?.[1],
        memberShipStartDate: TodayDate.today,
        memberShipEndDate: TodayDate.oneMonthLater,
      },
      "/jobs"
    );
    return handleUpgradeToast(params?.subscription?.[1] || "free");
  };
  const handleBack = () => router.push("/membership");

  return (
    <div className="bg-background p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Subscription: {params.subscription?.[1]}
      </h1>
      <h2 className="font-semibold mb-4">Payment Method</h2>
      <div className="bg-blue-500 w-64 h-36 rounded-lg shadow-lg flex items-center justify-center text-white mx-auto mb-4">
        <div className="text-center">
          <div className="text-sm">BANK</div>
          <div className="text-lg font-bold">1234 5678 9012 3456</div>
          <div className="text-sm">CARDHOLDER NAME</div>
          <div className="text-sm">12/24</div>
        </div>
      </div>
      <form
        onSubmit={handleSubscription}
        className="bg-card p-4 rounded-lg shadow-md"
      >
        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
        {["cardNumber", "cardholderName", "expiryDate", "cvv"].map(
          (field, idx) => (
            <div key={idx} className="mb-4">
              <label className="block text-sm mb-1 capitalize" htmlFor={field}>
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                id={field}
                className="border border-border rounded-lg p-2 w-full"
                type={field === "cvv" ? "number" : "text"}
                placeholder={field === "expiryDate" ? "MM/YY" : field}
                value={formData[field]}
                onChange={handleInputChange}
                required
              />
            </div>
          )
        )}
        <div className="flex justify-between gap-3">
          <button
            type="submit"
            className="bg-primary text-white hover:bg-primary/80 rounded-lg px-4 py-2"
          >
            Pay {params.subscription?.[2]}$
          </button>
          <Button type="button" onClick={handleBack}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HandleSubscriptionPage;
