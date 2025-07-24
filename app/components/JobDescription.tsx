import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { jobData } from "@/lib/data";

import { MapPin, CheckCircle2 } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";
import { VscFlame } from "react-icons/vsc";
import { IoLocationOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

interface JobDescriptionProps {
  job?: {
    id: number;
    title: string;
    description: string;
    responsibilities: string[];
    ideal_candidate: {
      age: string;
      gender: string;
      traits: string[];
    };
    when_where: string;
    about: {
      posted_on: string;
      deadline: string;
      location: string;
      start_date: string;
      end_date: string;
      categories: string[];
      required_skills: string[];
    };
    company: string;
    image: string;
  };
}

const JobDescription: React.FC<JobDescriptionProps> = ({ job }) => {
  if (!job) return null;
  return (
    <div className="bg-[#ffffff] p-2 md:p-4 lg:p-6 grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <div>
          <p className="text-2xl font-bold mb-4">Description</p>
          <p className="text-gray-700">{job.description}</p>
        </div>

        <div className="mt-6">
          <p className="text-xl font-semibold mb-4">Responsibilities</p>
          <ul className="space-y-1 text-gray-700">
            {job.responsibilities.map((resp, index) => (
              <li key={index} className="flex items-start gap-2 mt-1">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-xl font-semibold mb-2">Ideal Candidate we want</p>
          <div className="pl-5">
            <ul className="list-disc">
              <li className="font-semibold  text-gray-700 ">
                {job.ideal_candidate.age}{" "}
                <span>{job.ideal_candidate.gender}</span>{" "}
                <span>{job.title}</span>
              </li>
              {job.ideal_candidate.traits.map((trait, index) => {
                const [bold, rest] = trait.split(/:(.+)/);
                return (
                  <li key={index}>
                    <strong>{bold.trim()}</strong>
                    {rest ? `:${rest}` : ""}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-2 py-1">
          <p className="text-xl font-semibold mb-2">When & Where</p>
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <MapPin className="h-6 w-6 text-blue-500" />
            <span>{job.when_where}</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p className="text-xl font-extrabold mb-2">About</p>

          <div className="flex items-center gap-2 mb-2 text-gray-700">
        <div className="border-2 border-black bg-gray-100 rounded-full p-2 flex items-center justify-center w-10 h-10">
              <CiCirclePlus className="h-6 w-6 text-blue-500 " />
            </div>
            <div>
              <p>Posted on</p>
              <p className="font-semibold">{job.about.posted_on}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <VscFlame className="h-6 w-6 text-blue-500" />
            <div>
              <p>Posted on</p>
              <p className="font-semibold">{job.about.posted_on}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <IoLocationOutline className="h-6 w-6 text-blue-500" />
            <div>
              <p>Location</p>
              <p className="font-semibold">{job.about.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <MdDateRange className="h-6 w-6 text-blue-500" />
            <div>
              <p>Start Date</p>
              <p className="font-semibold">{job.about.start_date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <MdDateRange className="h-6 w-6 text-blue-500" />
            <div>
              <p>End Date</p>
              <p className="font-semibold">{job.about.end_date}</p>
            </div>
          </div>
        </div>
        <hr className="my-6 border-t border-gray-200" />

        <div className="mt-4 py-2">
          <p className="text-xl font-extrabold ">Categories</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {job.about.categories.map((category, index) => (
              <Badge
                key={index}
                className="bg-blue-100 py-2 text-blue-800 rounded-2xl"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
          <hr className="my-6 border-t border-gray-200" />

        <div className="mt-4 py-2">
          <p className="text-xl font-extrabold ">Required Skills</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {job.about.required_skills.map((skill, index) => (
              <Badge
                key={index}
                className="bg-blue-100 py-2 text-blue-800 rounded-2xl"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>

    //   <Card className="w-full  mx-auto shadow-lg rounded-lg overflow-hidden">

    //     <CardContent className="p-6 grid md:grid-cols-3 gap-8">

    //         <div className="grid gap-6">
    //           <div>
    //             <h2 className="text-xl font-semibold mb-2">Description</h2>
    //

    //           </div>

    //           <div>
    //             <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
    //             <ul className="space-y-1 text-muted-foreground text-sm">
    //               {job.responsibilities.map((resp, index) => (
    //                 <li key={index} className="flex items-start gap-2">
    //                   <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
    //                   <span>{resp}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>

    //           <div>
    //             <h2 className="text-xl font-semibold mb-2">Ideal Candidate we want</h2>
    //             <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
    //             {job.ideal_candidate.traits.map((req: string, index: number) => (
    //                 <li key={index}>
    //                   {/* This is a simple way to bold specific parts, for more complex cases, consider a markdown parser */}
    //                   <span dangerouslySetInnerHTML={{ __html: req.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>

    //           <div>
    //             <h2 className="text-xl font-semibold mb-2">When & Where</h2>
    //             <div className="flex items-center gap-2 text-muted-foreground text-sm">
    //               <MapPin className="h-4 w-4 text-gray-500" />
    //               <span>{job.when_where}</span>
    //             </div>
    //           </div>
    //         </div>

    //       <div className="md:col-span-1 grid gap-6">
    //         <div>
    //           <h2 className="text-xl font-semibold mb-2">About</h2>
    //           <div className="gap-2 text-sm text-muted-foreground">
    //              <div className=" flex">
    //              <div className="rounded-full border-2 border-blue-500 bg-amber-600 p-2 flex items-center justify-center">
    //   <CiCirclePlus className="h-6 w-6 text-blue-500 " />
    // </div>
    //              <div>
    //                 <p>Posted on</p>
    //                 <p className="font-semibold">{job.about.posted_on}</p>
    //                </div>
    //              </div>
    //           </div>
    //         </div>

    //     </div>
    //   </CardContent>
    // </Card>
  );
};

export default JobDescription;
