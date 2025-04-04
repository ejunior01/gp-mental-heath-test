import { ColumnFilter, PaginationState } from "@tanstack/react-table";

import { Survey } from "@/app/entities/survey";
import { httpClient } from "@/app/services/httpClient";
import { PaginationResponse } from "@/app/types/pagination-response";

export interface IGetAllSurveys {
  pagination: PaginationState;
  columnFilters?: ColumnFilter[];
}

export async function getAll({ pagination, columnFilters }: IGetAllSurveys) {

  const code = columnFilters?.find((e) => e.id === "code");
  
  const { data: surveis } = await httpClient.get<PaginationResponse<Survey>>(
    "/survey",
    {
      params: {
        page: pagination.pageIndex + 1,
        size: pagination.pageSize,
        code: code && code?.value,
      },
      paramsSerializer: {
        indexes: null,
      },
    }
  );

  return surveis;
}
