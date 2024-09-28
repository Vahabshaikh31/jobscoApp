"use client";

import { filterMenuDataArray, fromUrlQuery } from "@/utils";
import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import { Menubar, MenubarTrigger } from "../ui/menubar";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "@radix-ui/react-menubar";
import { Label } from "../ui/label";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  fetchJobApplicationForCandidate,
  fetchJobForRecruiterAction,
} from "@/actions";

export function JobListing({
  user,
  profileInfo,
  jobList,
  jobApplications,
  fetchFilterCategories,
}) {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const [JobCount, setJobCount] = useState();

  const handleFilter = (getSectionId, getCurrentOption) => {
    let cpyFiltersParams = { ...filterParams };
    const indexOFCurrentSection =
      Object.keys(cpyFiltersParams).indexOf(getSectionId);

    if (indexOFCurrentSection === -1) {
      cpyFiltersParams = {
        ...cpyFiltersParams,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFiltersParams[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        cpyFiltersParams[getSectionId].push(getCurrentOption);
      } else {
        cpyFiltersParams[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilterParams(cpyFiltersParams);
    sessionStorage.setItem("filterParam", JSON.stringify(cpyFiltersParams));
  };

  useEffect(() => {
    const savedFilters = sessionStorage.getItem("filterParam");
    if (savedFilters) {
      setFilterParams(JSON.parse(savedFilters));
    }
  }, []);

  useEffect(() => {
    if (filterParams && Object.keys(filterParams).length > 0) {
      let url = fromUrlQuery({
        params: searchParams.toString(),
        dataToAdd: filterParams,
      });
      router.push(url, { scroll: false });
    }
  }, [filterParams, searchParams]);

  const filterMenus = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    options: [
      ...new Set(fetchFilterCategories.map((listItem) => listItem[item.id])),
    ],
  }));

  const handleFetchRecruiterDetails = async () => {
    const res = await fetchJobForRecruiterAction(profileInfo.userId);
    setJobCount(res.length);
  };

  const handleFetchCandidateDetails = async () => {
    const res = await fetchJobApplicationForCandidate(profileInfo.userId);
    setJobCount(res.length);
  };

  useEffect(() => {
    profileInfo.role === "candidate"
      ? handleFetchCandidateDetails()
      : handleFetchRecruiterDetails();
  }, [JobCount]);

  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {profileInfo?.role === "candidate"
            ? "Explore All Jobs"
            : "Jobs Dashboard"}
        </h1>

        <div className="flex items-center space-x-4">
          {profileInfo?.role === "candidate" ? (
            <Menubar className="space-x-2">
              {filterMenus.map((filterMenu, filterIdx) => (
                <MenubarMenu key={filterIdx}>
                  <MenubarTrigger className="px-4 py-2 rounded-lg shadow-md transition-colors duration-200">
                    {filterMenu.name}
                  </MenubarTrigger>
                  <MenubarContent className="bg-white shadow-lg p-2 rounded-lg w-48">
                    {filterMenu.options.map((option, optionIdx) => (
                      <MenubarItem
                        key={optionIdx}
                        className="flex items-center p-2 cursor-pointer hover:bg-indigo-100 rounded transition-all duration-150"
                        onClick={() => handleFilter(filterMenu.id, option)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`h-4 w-4 mr-2 border rounded border-gray-300 ${
                              filterMenu &&
                              filterMenu.id &&
                              (filterParams[filterMenu.id] || []).includes(
                                option
                              )
                                ? "bg-black "
                                : "bg-white"
                            }`}
                          />

                          <Label className={`text-sm text-gray-700`}>
                            {option}
                          </Label>
                        </div>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              ))}
            </Menubar>
          ) : (
            <PostNewJob
              JobCount={JobCount}
              user={user}
              profileInfo={profileInfo}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {jobList && jobList.length > 0 ? (
          jobList.map((jobItem, index) =>
            profileInfo?.role === "candidate" ? (
              <CandidateJobCard
                key={index}
                jobItem={jobItem}
                profileInfo={profileInfo}
                jobApplications={jobApplications}
                JobCount={JobCount}
              />
            ) : (
              <RecruiterJobCard
                key={index}
                profileInfo={profileInfo}
                jobItem={jobItem}
                jobApplications={jobApplications}
                JobCount={JobCount}
              />
            )
          )
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No jobs available
          </p>
        )}
      </div>
    </div>
  );
}
