import { ApiEndpoints, httpClient } from "@/app/services/httpClient";
import { ColumnFilter, PaginationState } from "@tanstack/react-table";

import { PaginationResponse } from "@/app/types/pagination-response";
import { UploadSurvey } from "@/app/entities/upload-survey";

export interface IGetAllUploadSurvey {
  pagination: PaginationState;
  columnFilters?: ColumnFilter[];
}

export async function getAll({ pagination }: IGetAllUploadSurvey) {
  const { data } = await httpClient.get<PaginationResponse<UploadSurvey>>(
    `/${ApiEndpoints.uploadSurveyApiEndpoint}`,
    {
      params: {
        page: pagination.pageIndex + 1,
        size: pagination.pageSize,
      },
      paramsSerializer: {
        indexes: null,
      },
    }
  );

  return data;
}
