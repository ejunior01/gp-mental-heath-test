import { Input } from "@/view/components/ui/input";
import { Table } from "@tanstack/react-table";

interface SurveyDataTableFilterProps<TData> {
  table: Table<TData>;
}

export default function SurveyDataTableFilter<TData>({
  table,
}: SurveyDataTableFilterProps<TData>) {
  const codeColumn = table.getColumn("code");

  return (
    <div className="flex sm:flex-row flex-col sm:items-center gap-2 w-full sm:w-fit">
      {codeColumn && (
        <Input
          placeholder="Buscar pesquisa pelo código"
          value={(codeColumn.getFilterValue() as string) ?? ""}
          onChange={(event) => codeColumn.setFilterValue(event.target.value)}
          type="search"
          className="bg-muted border-none min-w-60 max-w-sm"
        />
      )}
    </div>
  );
}
