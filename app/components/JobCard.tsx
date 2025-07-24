import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { jobData } from "@/lib/data";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  avatarUrl: string;
  categories: string[];
}
function getCategoryColor(category: string) {
  switch (category) {
    case "Marketing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Design":
      return "bg-pink-100 text-pink-800 border-pink-200";
    case "Engineering":
      return "bg-green-100 text-green-800 border-green-200";
    // Add more categories as needed
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function JobCard({
  title,
  company,
  location,
  description,
  avatarUrl,
  categories,
}: JobCardProps) {
  return (
    <div className="flex bg-white rounded-3xl shadow-sm p-4 md:p-6 gap-6 w-full max-w-4xl">
     
          <div className="flex-shrink-0 flex items-start justify-center">
                  <img
          src={avatarUrl}
          alt={company}
          className="w-16 h-16 md:w-20 md:h-20 object-contain"
        />

        </div>

        <div className="flex flex-col gap-2 w-full">
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">
          {company} &bull; {location}
        </p>
        <p className="text-gray-700 text-sm">
          {description}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((category, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`px-3 py-1 text-xs font-medium ${getCategoryColor(
                    category
                  )}`}
                >
                  {category}
                </Badge>
              ))}
        </div>

         
      </div>
    </div>
  );
}
