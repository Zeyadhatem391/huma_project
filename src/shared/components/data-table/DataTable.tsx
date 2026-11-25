"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
};

export default function DataTable<TData extends { id: number | string }>({
  columns,
  data,
}: DataTableProps<TData>) {
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-b border-gray-300">
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="px-6 py-5 font-semibold text-lg uppercase"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody className="bg-white">
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => {
            const href = `/dashboard/projects/${row.original.id}`;

            return (
              <TableRow
                key={row.id}
                className="cursor-pointer border-y border-gray-300 hover:bg-gray-200/30"
                onMouseEnter={() => router.prefetch(href)}
                onTouchStart={() => router.prefetch(href)}
                onClick={() => router.push(href)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-6 py-4 font-semibold">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No data found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
