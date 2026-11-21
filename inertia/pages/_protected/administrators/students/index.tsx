import { type Data } from '@generated/data'
import { Head, router } from '@inertiajs/react'
import { type Column, type ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { urlFor } from '~/client'
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
import UserForm from '~/components/users/user_form'
import AdminLayout from '~/layouts/admin_layout'

interface AdminStudentsPageProps {
  students: Data.Student[]
}

export default function AdminStudentsIndexPage({ students }: AdminStudentsPageProps) {
  const [gradeFilter, setGradeFilter] = React.useState<string>('ALL')
  const [editingStudent, setEditingStudent] = React.useState<Data.Student | null>(null)
  const [deletingStudent, setDeletingStudent] = React.useState<Data.Student | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const grades = React.useMemo(() => {
    const set = new Set<number>()
    for (const student of students) {
      if (student.currentClass?.grade !== undefined) {
        set.add(student.currentClass.grade)
      }
    }
    return Array.from(set).sort((a, b) => a - b)
  }, [students])

  const filteredStudents = React.useMemo(() => {
    if (gradeFilter === 'ALL') return students
    if (gradeFilter === 'UNASSIGNED') return students.filter((s) => !s.currentClass)
    return students.filter((s) => String(s.currentClass?.grade) === gradeFilter)
  }, [students, gradeFilter])

  const columns = React.useMemo<ColumnDef<Data.Student>[]>(
    () => [
      {
        id: 'rowNumber',
        header: 'No',
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'identifier',
        header: ({ column }) => <SortableHeader column={column} label="NISN" />,
        cell: ({ row }) => <Badge variant="secondary">{row.original.identifier}</Badge>,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => <SortableHeader column={column} label="Name" />,
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        id: 'grade',
        accessorFn: (row) => row.currentClass?.grade ?? -1,
        header: ({ column }) => <SortableHeader column={column} label="Grade" />,
        cell: ({ row }) =>
          row.original.currentClass ? (
            `Grade ${row.original.currentClass.grade}`
          ) : (
            <span className="text-muted-foreground">-</span>
          ),
      },
      {
        id: 'className',
        header: 'Class',
        cell: ({ row }) =>
          row.original.currentClass ? (
            <Badge variant="outline">{row.original.currentClass.name}</Badge>
          ) : (
            <span className="text-muted-foreground">Unassigned</span>
          ),
      },
      {
        id: 'homeroomTeacher',
        header: 'Homeroom Teacher',
        cell: ({ row }) =>
          row.original.currentClass?.homeroomTeacher?.name ?? (
            <span className="text-muted-foreground">-</span>
          ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <ActionMenu
            onEdit={() => setEditingStudent(row.original)}
            onDelete={() => setDeletingStudent(row.original)}
          />
        ),
      },
    ],
    []
  )

  function handleDeleteConfirm() {
    if (!deletingStudent) return

    setIsDeleting(true)
    router.delete(urlFor('administrators.students.destroy', { id: deletingStudent.id }), {
      only: ['students'],
      onSuccess: () => setDeletingStudent(null),
      onFinish: () => setIsDeleting(false),
    })
  }

  return (
    <>
      <Head title="Students" />
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Students</h2>
          <p className="text-sm text-muted-foreground">Manage school&apos;s students</p>
        </div>
        <DataTable
          search={{ placeholder: 'Search students...' }}
          columns={columns}
          data={filteredStudents}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Grades</SelectItem>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={String(grade)}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                  <SelectItem value="UNASSIGNED">Unassigned</SelectItem>
                </SelectContent>
              </Select>
              <UserForm
                roleLabel="Student"
                identifierLabel="NISN"
                action={urlFor('administrators.students.store')}
                onlyProp="students"
              />
            </div>
          }
        />
      </div>

      <UserForm
        roleLabel="Student"
        identifierLabel="NISN"
        action={
          editingStudent ? urlFor('administrators.students.update', { id: editingStudent.id }) : ''
        }
        onlyProp="students"
        user={editingStudent}
        open={!!editingStudent}
        onOpenChange={(open) => {
          if (!open) setEditingStudent(null)
        }}
      />

      <Dialog
        open={!!deletingStudent}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeletingStudent(null)
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-medium text-foreground">
                {deletingStudent?.name} ({deletingStudent?.identifier})
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
            <Button variant="destructive" disabled={isDeleting} onClick={handleDeleteConfirm}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

AdminStudentsIndexPage.layout = [AdminLayout]

function SortableHeader({ column, label }: { column: Column<Data.Student>; label: string }) {
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

function ActionMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon" className="size-8">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
