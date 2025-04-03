import { Skeleton } from "@/view/components/ui/skeleton";

interface DataTableSkeletonProps {
  columns: number;
  rows: number;
}

export function DataTableSkeleton({ columns, rows }: DataTableSkeletonProps) {
  return (
    <div>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex}>
          {Array.from({ length: columns }, (_, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`}>
              <Skeleton className="w-full h-10" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
