import { Button } from "@/view/components/ui/button";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}
export default function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const paginationState = table.getState().pagination;
  const currentPage = paginationState.pageIndex + 1;
  const totalPages = table.getPageCount();
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  return (
    <div className="flex flex-wrap gap-y-2.5 justify-end items-center gap-x-6 lg:gap-x-8">
      <p className="sm:block flex justify-center gap-2 text-sm tabular-nums">
        Página <span className="font-medium">{currentPage}</span> de{" "}
        <span className="font-medium">{totalPages}</span>
      </p>

      <div className="flex items-center gap-x-1.5">
        <Button
          className="px-7 cursor-pointer"
          variant="outline"
          onClick={table.previousPage}
          disabled={!canPreviousPage}
          aria-label="Página Anterior"
        >
          Anterior
        </Button>
        <Button
          className="px-7 cursor-pointer"
          variant="outline"
          onClick={table.nextPage}
          disabled={!canNextPage}
          aria-label="Próxima Página"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
