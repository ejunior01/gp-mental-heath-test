import { VariantProps, cva } from "class-variance-authority";

import { UploadSurveyStatus } from "@/app/entities/upload-survey";
import { cn } from "@/lib/utils";

interface StatusItem {
  value: UploadSurveyStatus;
  label: string;
}
const statuses: StatusItem[] = [
  {
    value: "COMPLETED",
    label: "Concluído",
  },
  {
    value: "FAILURE",
    label: "Falha",
  },
  {
    value: "IN_PROCESS",
    label: "Em progresso",
  },
];

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  className?: string;
}

const statusBadgeVariants = cva(
  "inline-flex items-center gap-x-1 px-2 py-1 rounded-md max-w-max font-semibold text-xs whitespace-nowrap",
  {
    variants: {
      variant: {
        COMPLETED:
          "text-emerald-900 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10",
        IN_PROCESS:
          "text-yellow-900 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-400/10",
        FAILURE: "text-red-900 dark:text-red-400 bg-red-50 dark:bg-red-400/10",
      },
    },
    defaultVariants: {
      variant: "IN_PROCESS",
    },
  }
);

function StatusBadge({ className, variant }: StatusBadgeProps) {
  const statusLabel = statuses.find((i) => i.value === variant);
  return (
    <div className={cn(statusBadgeVariants({ variant, className }))}>
      <span>{statusLabel?.label || statusLabel?.value}</span>
    </div>
  );
}

export { StatusBadge, statusBadgeVariants };
