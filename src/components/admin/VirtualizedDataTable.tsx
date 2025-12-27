import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T = Record<string, unknown>> {
  key: string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface VirtualizedDataTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  estimateSize?: number;
}

export function VirtualizedDataTable<T = Record<string, unknown>>({ 
  data, 
  columns, 
  isLoading,
  estimateSize = 60 
}: VirtualizedDataTableProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 10,
  });

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div 
      ref={parentRef}
      className="rounded-md border overflow-auto"
      style={{ height: '600px' }}
    >
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <tr style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            <td colSpan={columns.length} style={{ padding: 0 }}>
              <div style={{ position: 'relative' }}>
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const row = data[virtualRow.index];
                  return (
                    <TableRow
                      key={virtualRow.index}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      {columns.map((column) => {
                        const value = (row as Record<string, unknown>)[column.key];
                        return (
                          <TableCell key={column.key}>
                            {column.render
                              ? column.render(value, row)
                              : String(value ?? '')}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </div>
            </td>
          </tr>
        </TableBody>
      </Table>
    </div>
  );
};
