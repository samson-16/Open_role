'use client';
// import { jobData } from "@/lib/data";
import JobDescription from "@/app/components/JobDescription";
import { notFound } from "next/navigation";
import  { useEffect, useState } from "react";
import axios from "axios";


interface JobPageProps {
  params: { id: string };
}

const JobPage: React.FC<JobPageProps> = ({ params }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://akil-backend.onrender.com/opportunities/${params.id}`)
      .then((response) => {
        setJob(response.data.data);
      })
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (!job) {
    return <div className="p-8 text-center text-red-600">Job not found</div>;
  }
  return (
    <div className="mx-auto px-4 pt-8">
      <JobDescription job={job} />
    </div>
  );
};

export default JobPage;
