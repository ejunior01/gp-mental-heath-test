import { IGetAllUploadSurvey } from "../services/uploadSurveysService/get-all";
import { uploadSurveysService } from "../services/uploadSurveysService";
import { useQuery } from "@tanstack/react-query";

export function useUploadSurveys({
  pagination,
  columnFilters,
}: IGetAllUploadSurvey) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["upload-surveys", pagination, columnFilters],
    queryFn: () => uploadSurveysService.getAll({ pagination, columnFilters }),
    staleTime: 1000 * 10,
    placeholderData: (previousData, _) => previousData,
  });

  return {
    uploadSurveysData: data,
    isLoading: isPending,
    isError,
    error,
  };
}
