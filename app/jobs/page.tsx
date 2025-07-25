"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { ArrowDownIcon } from "@chakra-ui/icons";
import JobCard from "../components/JobCard";

import { jobData } from "@/lib/data";

import { Poppins } from "next/font/google";
import JobDescription from "../components/JobDescription";
import Link from "next/link";
// import type { JobCardProps } from "../components/JobCard";
// import { fetchOpportunities } from "@/api";
import { jobprops } from "@/type";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

const JobList = () => {
  //  const totalResults = jobData.length
  const [jobs, setJobs] = useState<jobprops[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://akil-backend.onrender.com/opportunities/search")
      .then((response) => {
        setJobs(response.data.data);
        console.log(response.data.data);
      })
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto px-28 pt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className={`text-4xl  font-bold`}>Opportunities</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Showing results {jobs.length} jobs
          </p>
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

      <div className="flex flex-col gap-12">
        {/* <h2>fetching</h2> */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="cursor-pointer"
            >
              <JobCard
                id={job.id}
                title={job.title}
                description={job.description}
                orgName={job.orgName}
                location={job.location}
                opType={job.opType}
                logoUrl={job.logoUrl}
                categories={job.categories}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
