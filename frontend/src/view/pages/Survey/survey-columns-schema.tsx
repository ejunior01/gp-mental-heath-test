import { ColumnDef } from "@tanstack/react-table";
import { Survey } from "@/app/entities/survey";

export const surveysColumnsSchema: ColumnDef<Survey>[] = [
  {
    accessorKey: "code",
    header: "Código pesquisa",
  },
  {
    accessorKey: "noteOne",
    header: "Nota 1",
  },
  {
    accessorKey: "noteTwo",
    header: "Nota 2",
  },
  {
    accessorKey: "result",
    header: "Resultado pesquisa",
  },

  {
    accessorKey: "createdAt",
    header: "Data de criação",
  },
  {
    accessorKey: "uptadedAt",
    header: "Última atualizado",
  },
  {
    id: "actions",
    cell: ({}) => {
      return <span>Actions</span>;
    },
  },
];
