# DataTable Component Guide

A generic, reusable table component built on `@tanstack/react-table` v8 (`useReactTable`) and `lucide-react`, located at `inertia/components/shared/data_table.tsx`.

It supports:
- Client-side and server-side (AdonisJS Lucid paginator) pagination
- Global, column-specific, and server-side search
- Optional row selection with checkboxes
- Column sorting
- Custom toolbar actions and empty state

---

## Quick Start

```tsx
import { DataTable, type ColumnDef } from "~/components/shared/data_table"

type AcademicYear = {
  id: string
  year: number
  semester: "ODD" | "EVEN"
  isActive: boolean
}

const columns: ColumnDef<AcademicYear>[] = [
  { accessorKey: "year", header: "Year" },
  { accessorKey: "semester", header: "Semester" },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (row.original.isActive ? "Active" : "Inactive"),
  },
]

export default function AcademicYearsPage({
  academicYears,
}: {
  academicYears: AcademicYear[]
}) {
  return <DataTable columns={columns} data={academicYears} />
}
```

---

## Props Reference (`DataTableProps<TData, TValue>`)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `ColumnDef<TData, TValue>[]` | **Required** | TanStack Table column definitions. |
| `data` | `TData[]` | **Required** | Array of row data. |
| `getRowId` | `(row: TData, index: number) => string` | `row.id ?? index` | Custom unique row key extractor. |
| `enableRowSelection` | `boolean` | `false` | Prepends a checkbox column for selecting rows. |
| `onRowSelectionChange` | `(selectedRows: TData[]) => void` | `undefined` | Fires whenever selected rows change, passing the selected `TData[]`. |
| `search` | `boolean \| DataTableSearchConfig` | `true` | `true` for global client search, `false` to hide, or an object for custom config. |
| `pagination` | `false \| DataTablePaginationConfig` | `undefined` | `false` to disable pagination, or an object for client/server pagination. |
| `actions` | `React.ReactNode` | `undefined` | Elements rendered on the right side of the toolbar (e.g., Add button, bulk actions). |
| `emptyMessage` | `React.ReactNode` | `"No results."` | Content shown when `data` is empty or no rows match the filter. |
| `className` | `string` | `undefined` | Additional classes for the outer wrapper. |

---

## Pagination

### 1. Client-Side Pagination (Default)

When `pagination.meta` is not provided, the table paginates `data` in memory.

```tsx
<DataTable
  columns={columns}
  data={items}
  pagination={{
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50],
  }}
/>
```

### 2. Server-Side Pagination (AdonisJS Lucid)

Pass `meta` from Lucid's `.paginate(page, perPage)` result and handle `onPageChange` with Inertia's `router.get`.

```tsx
import { router } from "@inertiajs/react"
import { DataTable, type LucidPaginationMeta } from "~/components/shared/data_table"

type Props = {
  academicYears: {
    data: AcademicYear[]
    meta: LucidPaginationMeta
  }
}

export default function AcademicYearsPage({ academicYears }: Props) {
  return (
    <DataTable
      columns={columns}
      data={academicYears.data}
      pagination={{
        meta: academicYears.meta,
        onPageChange: (page, perPage) => {
          router.get(
            "/administrators/academic-years",
            { page, perPage },
            { preserveState: true, preserveScroll: true }
          )
        },
      }}
    />
  )
}
```

### 3. Disable Pagination

```tsx
<DataTable columns={columns} data={items} pagination={false} />
```

---

## Search

### 1. Global Client-Side Search (Default)

```tsx
<DataTable columns={columns} data={items} />
// or with custom placeholder:
<DataTable
  columns={columns}
  data={items}
  search={{ placeholder: "Search academic years..." }}
/>
```

### 2. Column-Specific Client-Side Search

```tsx
<DataTable
  columns={columns}
  data={items}
  search={{
    column: "year",
    placeholder: "Filter by year...",
  }}
/>
```

### 3. Server-Side Search

Provide `value` and `onChange` to control the input externally (e.g., triggering an Inertia visit).

```tsx
const [query, setQuery] = React.useState(initialSearch ?? "")

<DataTable
  columns={columns}
  data={academicYears.data}
  search={{
    value: query,
    placeholder: "Search...",
    onChange: (value) => {
      setQuery(value)
      router.get(
        "/administrators/academic-years",
        { search: value, page: 1 },
        { preserveState: true, replace: true }
      )
    },
  }}
/>
```

### 4. Hide Search

```tsx
<DataTable columns={columns} data={items} search={false} />
```

---

## Row Selection

Enable checkboxes with `enableRowSelection` and read selected rows via `onRowSelectionChange`.

```tsx
const [selected, setSelected] = React.useState<AcademicYear[]>([])

<DataTable
  columns={columns}
  data={items}
  enableRowSelection
  onRowSelectionChange={setSelected}
  actions={
    selected.length > 0 && (
      <Button variant="destructive" onClick={() => handleBulkDelete(selected)}>
        Delete ({selected.length})
      </Button>
    )
  }
/>
```

---

## Toolbar Actions

Use the `actions` prop for buttons or controls on the right side of the search bar.

```tsx
<DataTable
  columns={columns}
  data={items}
  actions={
    <Button onClick={openCreateModal}>
      <Plus className="mr-2 size-4" />
      Add Academic Year
    </Button>
  }
/>
```

---

## Sorting & Row Actions in Columns

### Sortable Column Header

```tsx
import { ArrowUpDown } from "lucide-react"
import { Button } from "~/components/ui/button"

const columns: ColumnDef<AcademicYear>[] = [
  {
    accessorKey: "year",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Year
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
]
```

### Row Actions Dropdown

```tsx
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

const columns: ColumnDef<AcademicYear>[] = [
  // ...other columns
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreVertical className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => onDelete(row.original)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
```
