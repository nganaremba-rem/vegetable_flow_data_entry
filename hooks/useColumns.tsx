"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { Column, ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type ColumnDefModifier<T> = ColumnDef<T> & {
  accessorKey?: string;
};

export function useColumns<T>(
  data: T[],
  additionalColumns?: ColumnDefModifier<T>[],
  hiddenColumns?: string[]
): ColumnDefModifier<T>[] {
  const [generatedCols, setGeneratedCols] = useState<ColumnDefModifier<T>[]>(
    []
  );

  useEffect(() => {
    if (!data) return;
    const columns = Object.keys(data?.[0] as object).map((key) => ({
      accessorKey: key,
      header: ({ column }: { column: Column<T, unknown> }) => {
        const title = key
          .replace(/([A-Z])/g, " $1")
          .replace(/([_-])/g, " ")
          .replace(/^./, (str) => {
            return str.toUpperCase();
          });
        return <DataTableColumnHeader column={column} title={title} />;
      },
    }));

    setGeneratedCols(columns);
  }, [data]);

  if (Array.isArray(additionalColumns) && additionalColumns.length > 0) {
    for (const col of additionalColumns) {
      const existingColIndex = generatedCols.findIndex((column) => {
        return column?.accessorKey === col?.accessorKey;
      });
      if (existingColIndex === -1) {
        generatedCols.push(col);
      }
      generatedCols[existingColIndex] = col;
    }
  }

  if (Array.isArray(hiddenColumns) && hiddenColumns.length > 0) {
    for (const hiddenCol of hiddenColumns) {
      const hiddenColIndex = generatedCols.findIndex((column) => {
        return column?.accessorKey === hiddenCol;
      });
      if (hiddenColIndex !== -1) {
        generatedCols.splice(hiddenColIndex, 1);
      }
    }
  }

  return generatedCols;
}
