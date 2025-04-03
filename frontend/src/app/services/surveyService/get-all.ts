import { ColumnFilter, PaginationState } from "@tanstack/react-table";

import { PaginationResponse } from "@/app/types/pagination-response";
import { Survey } from "@/app/entities/survey";
import { httpClient } from "@/app/services/httpClient";

export interface IGetAllSurveys {
  pagination: PaginationState;
  columnFilters?: ColumnFilter[];
}

export async function getAll({ pagination, columnFilters }: IGetAllSurveys) {
  const { data: surveis } = await httpClient.get<PaginationResponse<Survey>>(
    "/survey",
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

  return surveis;
}
