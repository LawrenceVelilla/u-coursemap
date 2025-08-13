import { useQuery } from "@tanstack/react-query";
import { getCourseDetails } from "@/actions/courses";
import { FinalCourseDetails } from "@/db/types";

const useCourse = (code: string) => {
    return useQuery<FinalCourseDetails>({
        queryKey: ["course", code],
        queryFn: () => getCourseDetails(code),
        enabled: !!code && code.trim().length > 0,
    });
};

export default useCourse;