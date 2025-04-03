import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/view/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/view/components/ui/popover";

import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { CheckIcon } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { Separator } from "@/view/components/ui/separator";
import { cn } from "@/lib/utils";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string | boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  const toggleFilter = (value: string) => {
    if (selectedValues.has(value)) {
      selectedValues.delete(value);
    } else {
      selectedValues.add(value);
    }
    column?.setFilterValue(
      selectedValues.size ? Array.from(selectedValues) : undefined
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="default" className="border-dashed">
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              {selectedValues.size < 2 ? (
                <div className="lg:flex space-x-1 hidden">
                  {options
                    .filter((option) =>
                      selectedValues.has(String(option.value))
                    )
                    .map((option) => (
                      <Badge
                        key={String(option.value)}
                        variant="secondary"
                        className="px-1 rounded-sm font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))}
                </div>
              ) : (
                <Badge
                  variant="secondary"
                  className="px-2 rounded-sm font-normal"
                >
                  {selectedValues.size}
                </Badge>
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[200px]" align="start">
        <Command>
          <CommandInput placeholder={`Filtrar ${title}`} />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(String(option.value));
                return (
                  <CommandItem
                    key={String(option.value)}
                    onSelect={() => toggleFilter(String(option.value))}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 w-4 h-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="flex justify-center items-center ml-auto w-4 h-4 font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Limpar filtros
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
