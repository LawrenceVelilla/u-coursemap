import { getCoursesNeeding } from "@/actions/courses";
import { useQuery } from "@tanstack/react-query";

export function useCourseRequiring(courseCode: string) {
  return useQuery({
    queryKey: ["courseRequiring", courseCode],
    queryFn: () => getCoursesNeeding(courseCode),
    enabled: !!courseCode,
  });
}