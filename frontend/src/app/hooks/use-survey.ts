import { useQuery } from "@tanstack/react-query";
import { surveyService } from "../services/surveysService";

export function useSurvey(code: string) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["survey", code],
    queryFn: () => surveyService.get(code),
    staleTime: 1000 * 10
  });

  return {
    survey: data,
    isLoading: isPending,
    isError,
    error,
  };
}
