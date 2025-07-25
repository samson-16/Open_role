// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// import Image from "next/image";
// import { jobData } from "@/lib/data";
import { JobCardProps } from "@/type";
import { getCategoryClasses } from "@/lib/catagorycolors";
// function getCategoryColor(category: string) {
//   switch (category) {
//     case "Marketing":
//       return "bg-blue-100 text-blue-800 border-blue-200";
//     case "Design":
//       return "bg-pink-100 text-pink-800 border-pink-200";
//     case "Engineering":
//       return "bg-green-100 text-green-800 border-green-200";
//     // Add more categories as needed
//     default:
//       return "bg-gray-100 text-gray-800 border-gray-200";
//   }
// }

const JobCard = ({
  id,
  title,
  description,
  orgName,
  location,
  logoUrl,
  categories,
  opType,
}: JobCardProps) => {
  return (
    <div className="flex bg-white rounded-3xl shadow-sm p-4 w-full max-w-4xl">
      <div className="flex-shrink-0 flex items-start justify-center py-2">
        <Avatar className="w-16 h-16">
          {logoUrl ? (
            <>
              <AvatarImage
                src={logoUrl}
                alt={orgName}
                className="object-contain"
              />
              
            </>
          ) : (
           <AvatarFallback className="bg-gray-200 text-gray-700 text-2xl font-bold">
                {orgName ? orgName.trim().split(" ")[0][0] : ""}
              </AvatarFallback>
          )}
        </Avatar>
      </div>
      <div className="flex flex-col gap-2 w-full px-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">
          {orgName} &bull;{" "}
          {Array.isArray(location) ? location.join(", ") : location}
        </p>
        <p className="text-gray-700 text-sm">{description}</p>
        <div className="mt-2 flex flex-wrap gap-2 items-center">
          <div>
            <p className="rounded-md bg-green-50 text-green-800 border-green-200 px-2 py-1 text-xs font-medium">
              {opType}
            </p>
          </div>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          {Array.isArray(categories)
            ? categories.map((category, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`px-3 py-1 text-xs font-medium ${getCategoryClasses(
                    category
                  )}`}
                >
                  {category}
                </Badge>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default JobCard;
