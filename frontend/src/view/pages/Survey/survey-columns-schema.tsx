import { Survey } from "@/app/entities/survey";
import { SurveyActionsDropdown } from "@/view/pages/Survey/Actions/survey-actions-dropdown";
import { ColumnDef } from "@tanstack/react-table";

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
    cell: ({ row }) => {
      return <SurveyActionsDropdown code={row.original.code} />
    },
  },
];
