import DataTableContent from "@/view/components/data-table/data-table-content";
import DataTablePagination from "@/view/components/data-table/data-table-pagination";
import { DataTableSkeleton } from "@/view/components/data-table/data-table-skeleton";
import { ReactNode } from "react";
import { Table } from "@tanstack/react-table";

interface TableContainerProps<TData> {
  isDataLoading: boolean;
  table: Table<TData>;
  children?: ReactNode;
}

export function DataTableContainer<TData>({
  children,
  isDataLoading,
  table,
}: TableContainerProps<TData>) {
  const hasRows = table.getRowModel().rows.length > 0;
  const columnCount = table.getAllColumns().length;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-x-6">
        {children}
      </div>
      <div className="relative mt-2 overflow-hidden overflow-x-auto">
        {isDataLoading ? (
          <DataTableSkeleton columns={columnCount} rows={4} />
        ) : (
          <DataTableContent table={table} />
        )}
      </div>
      {hasRows && <DataTablePagination table={table} />}
    </div>
  );
}
