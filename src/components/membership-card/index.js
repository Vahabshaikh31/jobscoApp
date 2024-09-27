"use client";
import { Button } from "@/components/ui/button";
import {
  MemberShipCardsForCandidate,
  MemberShipCardsForRecruiter,
} from "@/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const MembershipCard = (profileInfo) => {
  const [ProfileInfo, setProfileInfo] = useState({});

  const router = useRouter();
  const [MembershipData, setMembershipData] = useState(
    profileInfo.profileInfo?.role === "candidate"
      ? MemberShipCardsForCandidate
      : MemberShipCardsForRecruiter
  );

  const handleSubscribe = async (price, title) => {
    router.push(`/membership/subscription/${title}/${price}`);
  };

  useEffect(() => {
    setProfileInfo(profileInfo.profileInfo);
  }, [profileInfo]);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Choose Your Membership
      </h1>

      {/* Current Plan */}
      <h2 className="text-center text-lg text-4xl text-gray-600 mb-8">
        Current Plan:{" "}
        <span className="font-semibold text-4xl text-blue-600">
          {ProfileInfo.memberShipType === ""
            ? "FREE PLAN"
            : ProfileInfo.memberShipType}
        </span>
      </h2>

      {/* Membership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MembershipData &&
          MembershipData.map((memberShip, indx) => (
            <div
              key={indx}
              className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={memberShip.img}
                alt={memberShip.alt}
                className="mx-auto mb-4 w-24 h-24 rounded-full shadow-md"
              />
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {memberShip.title}
              </h2>
              <p className="text-gray-500 mb-6">{memberShip.description}</p>
              <h2 className="text-black text-2xl font-bold mb-6">
                ${memberShip.price}/month
              </h2>
              <Button
                onClick={() =>
                  handleSubscribe(memberShip.price, memberShip.title)
                }
                disabled={ProfileInfo.memberShipType === memberShip.title}
                className={`${
                  ProfileInfo.memberShipType === memberShip.title
                    ? "bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } transition-all duration-300 px-6 py-3 rounded-md w-full font-semibold`}
              >
                {ProfileInfo.memberShipType === memberShip.title
                  ? "Activated Plan"
                  : memberShip.button}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MembershipCard;
