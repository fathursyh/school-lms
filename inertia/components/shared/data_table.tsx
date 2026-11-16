import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { cn } from "~/lib/utils"

export type { ColumnDef }

export interface LucidPaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage?: number
}

export interface DataTablePaginationConfig {
  /** Provide AdonisJS Lucid paginator meta to enable server-side pagination */
  meta?: LucidPaginationMeta
  /** Called when page (1-based) or pageSize changes in server-side mode */
  onPageChange?: (page: number, pageSize: number) => void
  /** Default page size for client-side pagination (default: 10) */
  defaultPageSize?: number
  /** Page size options in the selector (default: [10, 20, 30, 40, 50]) */
  pageSizeOptions?: number[]
}

export interface DataTableSearchConfig {
  /** Specific column id to filter client-side; omit for global search */
  column?: string
  /** Input placeholder (default: "Search...") */
  placeholder?: string
  /** Controlled value (for server-side search) */
  value?: string
  /** Called when search input changes (use for server-side search) */
  onChange?: (value: string) => void
}

export interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** Optional unique row ID extractor (defaults to `row.id` or row index) */
  getRowId?: (row: TData, index: number) => string
  /** Enable row selection checkboxes (default: false) */
  enableRowSelection?: boolean
  /** Callback when selected rows change */
  onRowSelectionChange?: (selectedRows: TData[]) => void
  /** Search input configuration, `true` for global search, or `false` to hide (default: true) */
  search?: boolean | DataTableSearchConfig
  /** Pagination configuration, or `false` to disable pagination */
  pagination?: false | DataTablePaginationConfig
  /** Custom action elements on the right side of the toolbar */
  actions?: React.ReactNode
  /** Empty state message (default: "No results.") */
  emptyMessage?: React.ReactNode
  className?: string
}

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  getRowId,
  enableRowSelection = false,
  onRowSelectionChange,
  search = true,
  pagination,
  actions,
  emptyMessage = "No results.",
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const paginationDisabled = pagination === false
  const paginationConfig = pagination === false ? undefined : pagination
  const serverMeta = paginationConfig?.meta
  const isServerPagination = Boolean(serverMeta)
  const pageSizeOptions = paginationConfig?.pageSizeOptions ?? [10, 20, 30, 40, 50]

  const [clientPagination, setClientPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: paginationConfig?.defaultPageSize ?? 10,
  })

  const activePagination: PaginationState = isServerPagination
    ? {
        pageIndex: Math.max(0, (serverMeta?.currentPage ?? 1) - 1),
        pageSize: serverMeta?.perPage ?? 10,
      }
    : clientPagination

  const tableColumns = React.useMemo<ColumnDef<TData, TValue>[]>(() => {
    if (!enableRowSelection) return columns

    const selectionColumn: ColumnDef<TData, TValue> = {
      id: "_select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }

    return [selectionColumn, ...columns]
  }, [columns, enableRowSelection])

  const searchConfig = typeof search === "object" ? search : undefined
  const showSearch = search !== false

  const table = useReactTable({
    data,
    columns: tableColumns,
    getRowId: getRowId
      ? (row, index) => getRowId(row, index)
      : (row, index) => {
          const maybeId = (row as { id?: string | number })?.id
          return maybeId !== undefined ? String(maybeId) : String(index)
        },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      ...(paginationDisabled ? {} : { pagination: activePagination }),
    },
    manualPagination: isServerPagination,
    pageCount: isServerPagination ? (serverMeta?.lastPage ?? 1) : undefined,
    enableRowSelection,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: paginationDisabled
      ? undefined
      : (updater) => {
          const next =
            typeof updater === "function" ? updater(activePagination) : updater
          if (isServerPagination) {
            paginationConfig?.onPageChange?.(next.pageIndex + 1, next.pageSize)
          } else {
            setClientPagination(next)
          }
        },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: searchConfig?.onChange ? undefined : getFilteredRowModel(),
    getPaginationRowModel:
      paginationDisabled || isServerPagination ? undefined : getPaginationRowModel(),
  })

  React.useEffect(() => {
    if (!onRowSelectionChange) return
    const selected = table.getSelectedRowModel().rows.map((r) => r.original)
    onRowSelectionChange(selected)
  }, [rowSelection, onRowSelectionChange, table])

  const searchValue = searchConfig?.onChange
    ? (searchConfig.value ?? "")
    : searchConfig?.column
      ? ((table.getColumn(searchConfig.column)?.getFilterValue() as string) ?? "")
      : globalFilter

  function handleSearchChange(value: string) {
    if (searchConfig?.onChange) {
      searchConfig.onChange(value)
      return
    }
    if (searchConfig?.column) {
      table.getColumn(searchConfig.column)?.setFilterValue(value)
    } else {
      setGlobalFilter(value)
    }
  }

  const pageCount = Math.max(1, table.getPageCount())
  const totalRows = isServerPagination
    ? (serverMeta?.total ?? data.length)
    : table.getFilteredRowModel().rows.length

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {(showSearch || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {showSearch ? (
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchValue}
                type="search"
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={searchConfig?.placeholder ?? "Search..."}
                className="pl-9"
              />
            </div>
          ) : (
            <div />
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!paginationDisabled && (
        <div className="flex flex-wrap items-center justify-between gap-4 px-1">
          <div className="text-sm text-muted-foreground">
            {enableRowSelection ? (
              <>
                {table.getFilteredSelectedRowModel().rows.length} of {totalRows}{" "}
                row(s) selected.
              </>
            ) : (
              <>{totalRows} total row(s)</>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-2 sm:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${activePagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-20" id="rows-per-page">
                  <SelectValue placeholder={activePagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm font-medium">
              Page {activePagination.pageIndex + 1} of {pageCount}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(pageCount - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
