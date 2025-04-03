import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { DataTableContainer } from "@/view/components/data-table/data-table-container";
import { surveysColumnsSchema } from "./survey-columns-schema";
import { useSurveys } from "@/app/hooks/use-surveys";
import { useTable } from "@/app/hooks/use-table";

export function SurveyPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { allSurveysData, isAllSurveysDataLoading } = useSurveys({
    pagination,
    columnFilters,
  });

  const columns = useMemo(() => surveysColumnsSchema, []);
  const { data = [], pages = 0, total = 0 } = allSurveysData || {};

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
      <h1 className="font-bold text-2xl">Resultado das pesquisas</h1>
      <DataTableContainer
        isDataLoading={isAllSurveysDataLoading}
        table={table}
      ></DataTableContainer>
    </div>
  );
}
