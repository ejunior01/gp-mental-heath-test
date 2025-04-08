import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { DataTableContainer } from "@/view/components/data-table/data-table-container";
import { RegisterUploadSurveyDialog } from "./Actions/RegisterUploadSurvey/register-upload-survey-dialog";
import { uploadSurveysColumnsSchema } from "./upload-survey-columns-schema";
import { useTable } from "@/app/hooks/use-table";
import { useUploadSurveys } from "@/app/hooks/use-upload-surveys";

export function UploadSurveyPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { uploadSurveysData, isLoading } = useUploadSurveys({
    pagination,
    columnFilters,
  });

  const columns = useMemo(() => uploadSurveysColumnsSchema, []);

  const { data = [], pages = 0, total = 0 } = uploadSurveysData || {};

  const table = useTable({
    data,
    columns,
    columnFilters,
    pagesCount: pages,
    pagination,
    rowsCount: total,
    setPagination,
    setSorting,
    sorting,
    setColumnFilters,
  });

  return (
    <div>
      <h1 className="font-bold text-2xl">Controle do upload das pesquisas</h1>
      <div className="flex gap-3 justify-end">
        <RegisterUploadSurveyDialog />
      </div>
      <DataTableContainer
        isDataLoading={isLoading}
        table={table}
      ></DataTableContainer>
    </div>
  );
}
