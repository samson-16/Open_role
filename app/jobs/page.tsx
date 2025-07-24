"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React from "react";

import { ArrowDownIcon } from "@chakra-ui/icons";
import JobCard from "../components/JobCard";

import { jobData } from "@/lib/data";

import { Poppins } from "next/font/google";
import JobDescription from "../components/JobDescription";
import Link from "next/link";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

const JobList = () => {
  //  const totalResults = jobData.length
  return (
    <div className="mx-auto px-28 pt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className={`text-4xl  font-bold`}>Opportunities</p>
          <p className="text-sm text-muted-foreground mt-0.5">Showing results</p>
        </div>
        <div className="flex items-center gap-2">
          sort by:
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                Most relevant <ArrowDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Most relevant</DropdownMenuItem>
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {jobData.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="cursor-pointer block"
          >
            <JobCard
              title={job.title}
              company={job.company}
              location={job.about.location}
              description={job.description}
              avatarUrl={job.image}
              categories={job.about.categories}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobList;
