import { IGetAllSurveys } from "../services/surveyService/get-all";
import { surveyService } from "../services/surveyService";
import { useQuery } from "@tanstack/react-query";

export function useSurveys({ pagination, columnFilters }: IGetAllSurveys) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["surveys", pagination, columnFilters],
    queryFn: () => surveyService.getAll({ pagination, columnFilters }),
    staleTime: 1000 * 10,
    placeholderData: (previousData, _) => previousData,
  });

  return {
    allSurveysData: data,
    isAllSurveysDataLoading: isPending,
    isError,
    error,
  };
}
