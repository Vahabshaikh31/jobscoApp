"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { useState, Fragment } from "react";

const CandidateJobCard = ({ jobItem }) => {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);

  const { description, title, location, type, experience, skills } = jobItem;

  return (
    <Fragment>
      {/* Job Card */}
      <CommonCard
        icon={<JobIcon />}
        title={title}
        description={description}
        footerContent={
          <Button
            onClick={() => setShowJobDetailsDrawer(true)}
            className="bg-blue-600 border rounded-md p-2 text-white hover:bg-blue-700 transition-all duration-300"
          >
            View Details
          </Button>
        }
        className="shadow-md hover:shadow-lg transition-shadow rounded-lg bg-white p-4"
      />

      {/* Drawer for Job Details */}
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
        className="bg-gray-50 shadow-lg"
      >
        <DrawerContent className="p-6 space-y-6">
          <DrawerHeader className="flex justify-between items-center border-b pb-4">
            <DrawerTitle className="text-3xl font-bold text-gray-900">
              {title}
            </DrawerTitle>{" "}
            <DrawerClose
              onClick={() => setShowJobDetailsDrawer(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </DrawerClose>
          </DrawerHeader>

          <DrawerDescription className="text-gray-700">
            <p className="mt-2">
              <span className="font-semibold">Location: </span>
              {location}
            </p>
            <p>
              <span className="font-semibold">Job Type: </span>
              {type}
            </p>
            <p>
              <span className="font-semibold">Experience Required: </span>
              {experience} years
            </p>
          </DrawerDescription>

          {/* Skills Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Required Skills
            </h3>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {skills?.split(",").map((skillItem, index) => (
                <li
                  key={index}
                  className="bg-gray-200 text-gray-800 rounded-md px-3 py-1 text-sm"
                >
                  {skillItem}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => setShowJobDetailsDrawer(false)}
            >
              Apply
            </Button>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => setShowJobDetailsDrawer(false)}
            >
              Cancel
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default CandidateJobCard;