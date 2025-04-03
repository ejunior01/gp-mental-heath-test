import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Table as TableType, flexRender } from "@tanstack/react-table";

interface DataTableContentProps<TData> {
  table: TableType<TData>;
}
export default function DataTableContent<TData>({
  table,
}: DataTableContentProps<TData>) {
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  const hasRows = rows.length > 0;
  const columnCount = table.getAllColumns().length;

  return (
    <Table className="border w-full rounded-md caption-bottom">
      <TableHeader className="border-t border-b">
        {headerGroups.map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="py-1 text-xs"
                colSpan={header.colSpan}
                style={{
                  width:
                    header.getSize() !== 150 ? header.getSize() : undefined,
                }}
              >
                {!header.isPlaceholder &&
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {hasRows ? (
          rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="mt-auto px-2 py-3 border-t border-b text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columnCount} className="h-24 text-center">
              Nenhum dado encontrado
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
