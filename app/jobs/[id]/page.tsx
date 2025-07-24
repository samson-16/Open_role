import { jobData } from "@/lib/data";
import JobDescription from "@/app/components/JobDescription"; 
import { notFound } from "next/navigation";

interface JobPageProps {
  params: { id: string };
}

export default function JobPage({ params }: JobPageProps) {
  const job = jobData.find((j) => j.id === Number(params.id));
  if (!job) {
    return <div className="p-8 text-center text-red-600">Job not found</div>;
  }
  return (
    <div className="mx-auto px-4 pt-8">
      <JobDescription job={job} />
    </div>
  );
}
