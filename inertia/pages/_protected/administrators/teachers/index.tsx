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

interface AdminTeachersPageProps {
  teachers: Data.Teacher[]
}

type HomeroomFilter = 'ALL' | 'HOMEROOM' | 'NON_HOMEROOM'

export default function AdminTeachersIndexPage({ teachers }: AdminTeachersPageProps) {
  const [homeroomFilter, setHomeroomFilter] = React.useState<HomeroomFilter>('ALL')
  const [editingTeacher, setEditingTeacher] = React.useState<Data.Teacher | null>(null)
  const [deletingTeacher, setDeletingTeacher] = React.useState<Data.Teacher | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const filteredTeachers = React.useMemo(() => {
    if (homeroomFilter === 'ALL') return teachers
    if (homeroomFilter === 'HOMEROOM') return teachers.filter((t) => Boolean(t.homeroomClass))
    return teachers.filter((t) => !t.homeroomClass)
  }, [teachers, homeroomFilter])

  const columns = React.useMemo<ColumnDef<Data.Teacher>[]>(
    () => [
      {
        id: 'rowNumber',
        header: 'No',
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'identifier',
        header: ({ column }) => <SortableHeader column={column} label="NIP" />,
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
        id: 'homeroomClass',
        header: 'Homeroom Class',
        cell: ({ row }) =>
          row.original.homeroomClass ? (
            <Badge variant="outline">
              Grade {row.original.homeroomClass.grade} - {row.original.homeroomClass.name}
            </Badge>
          ) : (
            <span className="text-muted-foreground">-</span>
          ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <ActionMenu
            onEdit={() => setEditingTeacher(row.original)}
            onDelete={() => setDeletingTeacher(row.original)}
          />
        ),
      },
    ],
    []
  )

  function handleDeleteConfirm() {
    if (!deletingTeacher) return

    setIsDeleting(true)
    router.delete(urlFor('administrators.teachers.destroy', { id: deletingTeacher.id }), {
      only: ['teachers'],
      onSuccess: () => setDeletingTeacher(null),
      onFinish: () => setIsDeleting(false),
    })
  }

  return (
    <>
      <Head title="Teachers" />
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Teachers</h2>
          <p className="text-sm text-muted-foreground">Manage school&apos;s teachers</p>
        </div>
        <DataTable
          search={{ placeholder: 'Search teachers...' }}
          columns={columns}
          data={filteredTeachers}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={homeroomFilter}
                onValueChange={(value) => setHomeroomFilter(value as HomeroomFilter)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Homeroom" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Teachers</SelectItem>
                  <SelectItem value="HOMEROOM">Homeroom Teacher</SelectItem>
                  <SelectItem value="NON_HOMEROOM">Non-Homeroom</SelectItem>
                </SelectContent>
              </Select>
              <UserForm
                roleLabel="Teacher"
                identifierLabel="NIP"
                action={urlFor('administrators.teachers.store')}
                onlyProp="teachers"
              />
            </div>
          }
        />
      </div>

      <UserForm
        roleLabel="Teacher"
        identifierLabel="NIP"
        action={
          editingTeacher ? urlFor('administrators.teachers.update', { id: editingTeacher.id }) : ''
        }
        onlyProp="teachers"
        user={editingTeacher}
        open={!!editingTeacher}
        onOpenChange={(open) => {
          if (!open) setEditingTeacher(null)
        }}
      />

      <Dialog
        open={!!deletingTeacher}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeletingTeacher(null)
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Teacher</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-medium text-foreground">
                {deletingTeacher?.name} ({deletingTeacher?.identifier})
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

AdminTeachersIndexPage.layout = [AdminLayout]

function SortableHeader({ column, label }: { column: Column<Data.Teacher>; label: string }) {
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
