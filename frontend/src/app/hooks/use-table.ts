import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface IUseTable<TData> {
  data: TData[] | [];
  rowsCount: number;
  pagesCount: number;
  columns: ColumnDef<TData>[];
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  columnFilters: ColumnFiltersState;
  setColumnFilters?: OnChangeFn<ColumnFiltersState>;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
}

export function useTable<TData>({
  data,
  columns,
  columnFilters,
  pagesCount,
  pagination,
  rowsCount,
  setPagination,
  setSorting,
  sorting,
  setColumnFilters,
}: IUseTable<TData>) {
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    enableMultiSort: true,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,

    sortDescFirst: true,

    rowCount: rowsCount,
    pageCount: pagesCount,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });
}
