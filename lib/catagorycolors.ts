// lib/categoryColors.ts

export const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  // From your data:
  "Education Access and Quality Improvement": {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  "Youth Empowerment and Development": {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  "Category1": {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-200",
  },
  "Category2": {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
  "Orphanages and Child Welfare": {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-200",
  },
};

// Fallback if you ever get a category outside the above list
export const defaultCategoryColor = {
  bg: "bg-gray-100",
  text: "text-gray-800",
  border: "border-gray-200",
};

export function getCategoryClasses(category: string) {
  const { bg, text, border } = categoryColors[category] ?? defaultCategoryColor;
  return `${bg} ${text} ${border}`;
}
