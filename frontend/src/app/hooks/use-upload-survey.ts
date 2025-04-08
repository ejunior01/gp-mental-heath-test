import { uploadSurveysService } from "../services/uploadSurveysService";
import { useQuery } from "@tanstack/react-query";

export function useUploadSurveys(id: number) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["upload-survey"],
    queryFn: () => uploadSurveysService.get(id),
    staleTime: 1000 * 10,
  });

  return {
    allSurveysData: data,
    isLoading: isPending,
    isError,
    error,
  };
}
