import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/view/components/status-badge";
import { UploadSurvey } from "@/app/entities/upload-survey";
import { formatDate } from "@/lib/dayjs-config";

export const uploadSurveysColumnsSchema: ColumnDef<UploadSurvey>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "totalRecords",
    header: "Total de registros",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge variant={row.original.status} />;
    },
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
];
