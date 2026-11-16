import { type Data } from '@generated/data'
import { Head, router } from '@inertiajs/react'
import { type Column, type ColumnDef } from '@tanstack/react-table'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'
import React from 'react'
import { urlFor } from '~/client'
import AcademicYearForm from '~/components/academic_year/academic_year_form'
import { DataTable } from '~/components/shared/data_table'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import AdminLayout from '~/layouts/admin_layout'
import { cn } from '~/lib/utils'

interface AdminAcademicYearsPageProps {
  academicYears: Data.AcademicYear[]
}

type SemesterFilter = 'ALL' | 'ODD' | 'EVEN'
type StatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE'

export default function AdminAcademicYearsIndexPage({
  academicYears,
}: AdminAcademicYearsPageProps) {
  const [semesterFilter, setSemesterFilter] = React.useState<SemesterFilter>('ALL')
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>('ALL')
  const [editingAcademicYear, setEditingAcademicYear] =
    React.useState<Data.AcademicYear | null>(null)
  const [deletingAcademicYear, setDeletingAcademicYear] =
    React.useState<Data.AcademicYear | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const filteredAcademicYears = React.useMemo(() => {
    return academicYears.filter((item) => {
      if (semesterFilter !== 'ALL' && item.semester !== semesterFilter) {
        return false
      }
      if (statusFilter === 'ACTIVE' && !item.isActive) {
        return false
      }
      if (statusFilter === 'INACTIVE' && item.isActive) {
        return false
      }
      return true
    })
  }, [academicYears, semesterFilter, statusFilter])

  const columns = React.useMemo<ColumnDef<Data.AcademicYear>[]>(
    () => [
      {
        id: 'rowNumber',
        header: 'No',
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'year',
        header: ({ column }) => <SortableHeader column={column} label="Year" />,
      },
      { accessorKey: 'semester', header: 'Semester', cell: ({row}) => {
        const style = row.original.semester === 'ODD' ? 'bg-orange-500 hover:bg-orange-600'
         : 'bg-blue-500 hover:bg-blue-600'
        return (
        <Badge className={cn(
          'capitalize',
          style
        )}>{row.original.semester.toLowerCase()}</Badge>
      )
      } },
      {
        accessorKey: 'isActive',
        header: ({ column }) => <SortableHeader column={column} label="Status" />,
        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
            {row.original.isActive ? 'Active' : 'Inactive'}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <ActionMenu
            isActive={row.original.isActive}
            onActivate={() =>
              router.patch(
                urlFor('administrators.academic_years.activate', { id: row.original.id }),
                {},
                { only: ['academicYears'] }
              )
            }
            onEdit={() => setEditingAcademicYear(row.original)}
            onDelete={() => setDeletingAcademicYear(row.original)}
          />
        ),
      },
    ],
    []
  )

  function handleDeleteConfirm() {
    if (!deletingAcademicYear) return

    setIsDeleting(true)
    router.delete(
      urlFor('administrators.academic_years.destroy', { id: deletingAcademicYear.id }),
      {
        only: ['academicYears'],
        onSuccess: () => setDeletingAcademicYear(null),
        onFinish: () => setIsDeleting(false),
      }
    )
  }

  return (
    <>
      <Head title="Academic Years" />
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Academic Years</h2>
          <p className="text-sm text-muted-foreground">Manage school&apos;s academic years</p>
        </div>
        <DataTable
          search={{ placeholder: 'Search academic years...' }}
          columns={columns}
          data={filteredAcademicYears}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={semesterFilter}
                onValueChange={(value) => setSemesterFilter(value as SemesterFilter)}
              >
                <SelectTrigger className="w-35">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Semesters</SelectItem>
                  <SelectItem value="ODD">Odd</SelectItem>
                  <SelectItem value="EVEN">Even</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as StatusFilter)}
              >
                <SelectTrigger className="w-32.5">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <AcademicYearForm />
            </div>
          }
        />
      </div>

      <AcademicYearForm
        academicYear={editingAcademicYear}
        open={!!editingAcademicYear}
        onOpenChange={(open) => {
          if (!open) setEditingAcademicYear(null)
        }}
      />

      <Dialog
        open={!!deletingAcademicYear}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeletingAcademicYear(null)
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Academic Year</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-medium text-foreground">
                {deletingAcademicYear?.year} ({deletingAcademicYear?.semester})
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="ghost" disabled={isDeleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDeleteConfirm}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

AdminAcademicYearsIndexPage.layout = [AdminLayout]

function SortableHeader({
  column,
  label,
}: {
  column: Column<Data.AcademicYear>
  label: string
}) {
  const sorted = column.getIsSorted()
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="-ml-3 h-8"
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      {label}
      {sorted === 'asc' ? (
        <ArrowUp className="ml-1 size-4" />
      ) : sorted === 'desc' ? (
        <ArrowDown className="ml-1 size-4" />
      ) : (
        <ArrowUpDown className="ml-1 size-4 text-muted-foreground" />
      )}
    </Button>
  )
}

function ActionMenu({
  isActive,
  onActivate,
  onEdit,
  onDelete,
}: {
  isActive: boolean
  onActivate: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!isActive && (
          <DropdownMenuItem onClick={onActivate}>
            <CheckCircle2 />
            Set as Active
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onEdit}>
          <Pencil />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={onDelete}
        >
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
