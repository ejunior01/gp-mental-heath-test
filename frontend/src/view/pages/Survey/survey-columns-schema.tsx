import { ColumnDef } from "@tanstack/react-table";
import { Survey } from "@/app/entities/survey";
import { SurveyActions } from "@/view/pages/Survey/Actions/survey-actions";
import { formatDate } from "@/lib/dayjs-config";

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
    cell: ({ row }) => {
      return <div>{formatDate(row.original.createdAt)}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Última atualizado",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.updatedAt)}</div>;
    },
  },
  {
    id: "actions",
    header: () => {
      return <div className="text-center w-full">Ações</div>;
    },
    cell: ({ row }) => {
      return <SurveyActions code={row.original.code} />;
    },
  },
];
