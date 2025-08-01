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
import Link from "next/link";
import { jobprops } from "@/type";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

const JobList = () => {
  const [jobs, setJobs] = useState<jobprops[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);
  const { data: session } = useSession();

  // console.log("session", session);

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://akil-backend.onrender.com/opportunities/search"
        );
        setJobs(response.data.data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job opportunities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch bookmarks when session changes
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!session) return;
      const accessToken = (session as any)?.accessToken;
console.log("accessToken used for bookmarks:", accessToken);
      if (!accessToken) {
        console.error("No access token found in session");
        return;
      }

      try {
        const res = await axios.get(
          "https://akil-backend.onrender.com/bookmarks",
          {
            headers: {
              Authorization: `Bearer ${(session as any).accessToken}`,
            },
          }
        );

        const bookmarkedIds = res.data.data?.map((b: any) => b.eventID) || [];
        setBookmarkedJobs(bookmarkedIds);
      } catch (error) {
        console.error("Failed to fetch bookmarks", error);
      }
    };

    fetchBookmarks();
  }, [session]);

  const handleToggleBookmark = async (
    jobId: string,
    currentlyBookmarked: boolean
  ) => {
    if (!session) {
      alert("Please sign in to bookmark jobs");
      return;
    }

    const accessToken = (session as any)?.accessToken;
console.log("accessToken used for bookmarks:", accessToken);
    try {
      if (currentlyBookmarked) {
        await axios.delete(
          `https://akil-backend.onrender.com/bookmarks/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setBookmarkedJobs((prev) => prev.filter((id) => id !== jobId));
      } else {
        await axios.post(
          `https://akil-backend.onrender.com/bookmarks/${jobId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setBookmarkedJobs((prev) => [...prev, jobId]);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  // Conditionally render loading/error states AFTER hooks
  if (loading) {
    return (
      <div className="mx-auto px-4 sm:px-6 md:px-28 pt-16">
        <div className="flex flex-col gap-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border rounded-lg p-6">
              <div className="flex flex-col gap-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-4 sm:px-6 md:px-28 pt-16 flex flex-col items-center justify-center h-[50vh]">
        <div className="text-center max-w-md">
          <div className="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Jobs</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!loading && jobs.length === 0) {
    return (
      <div className="mx-auto px-4 sm:px-6 md:px-28 pt-16 flex flex-col items-center justify-center h-[50vh]">
        <div className="text-center max-w-md">
          <div className="bg-gray-100 text-gray-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">
            No Job Opportunities Found
          </h2>
          <p className="text-gray-600 mb-6">
            There are currently no open positions. Please check back later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-28 pt-16 pb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Opportunities</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Showing {filteredJobs.length}{" "}
            {filteredJobs.length === 1 ? "job" : "jobs"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white border border-gray-300"
              >
                Most relevant <ArrowDownIcon className="w-3 h-3" />
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

      <div className="flex flex-col gap-6">
        {filteredJobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="cursor-pointer transition-transform hover:scale-[1.01]"
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
              isBookmarked={bookmarkedJobs.includes(job.id)}
              onToggleBookmark={handleToggleBookmark}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobList;
