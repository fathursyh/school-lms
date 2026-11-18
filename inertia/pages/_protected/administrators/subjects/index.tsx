import { type Data } from '@generated/data'
import { Head, router } from '@inertiajs/react'
import { type Column, type ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { urlFor } from '~/client'
import { DataTable } from '~/components/shared/data_table'
import SubjectForm from '~/components/subject/subject_form'
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

interface AdminSubjectsPageProps {
  subjects: Data.Subject[]
}

function getCodePrefix(code: string) {
  const match = code.match(/^[A-Za-z]+/)
  return match ? match[0].toUpperCase() : 'OTHER'
}

export default function AdminSubjectsIndexPage({ subjects }: AdminSubjectsPageProps) {
  const [prefixFilter, setPrefixFilter] = React.useState<string>('ALL')
  const [editingSubject, setEditingSubject] = React.useState<Data.Subject | null>(null)
  const [deletingSubject, setDeletingSubject] = React.useState<Data.Subject | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const codePrefixes = React.useMemo(() => {
    const prefixes = new Set(subjects.map((subject) => getCodePrefix(subject.code)))
    return Array.from(prefixes).sort()
  }, [subjects])

  const filteredSubjects = React.useMemo(() => {
    if (prefixFilter === 'ALL') return subjects
    return subjects.filter((subject) => getCodePrefix(subject.code) === prefixFilter)
  }, [subjects, prefixFilter])

  const columns = React.useMemo<ColumnDef<Data.Subject>[]>(
    () => [
      {
        id: 'rowNumber',
        header: 'No',
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'code',
        header: ({ column }) => <SortableHeader column={column} label="Code" />,
        cell: ({ row }) => <Badge variant="secondary">{row.original.code}</Badge>,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => <SortableHeader column={column} label="Name" />,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <ActionMenu
            onEdit={() => setEditingSubject(row.original)}
            onDelete={() => setDeletingSubject(row.original)}
          />
        ),
      },
    ],
    []
  )

  function handleDeleteConfirm() {
    if (!deletingSubject) return

    setIsDeleting(true)
    router.delete(urlFor('administrators.subjects.destroy', { id: deletingSubject.id }), {
      only: ['subjects'],
      onSuccess: () => setDeletingSubject(null),
      onFinish: () => setIsDeleting(false),
    })
  }

  return (
    <>
      <Head title="Subjects" />
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Subjects</h2>
          <p className="text-sm text-muted-foreground">Manage school&apos;s subjects</p>
        </div>
        <DataTable
          search={{ placeholder: 'Search subjects...' }}
          columns={columns}
          data={filteredSubjects}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <Select value={prefixFilter} onValueChange={setPrefixFilter}>
                <SelectTrigger className="w-35">
                  <SelectValue placeholder="Code Prefix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Codes</SelectItem>
                  {codePrefixes.map((prefix) => (
                    <SelectItem key={prefix} value={prefix}>
                      {prefix}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <SubjectForm />
            </div>
          }
        />
      </div>

      <SubjectForm
        subject={editingSubject}
        open={!!editingSubject}
        onOpenChange={(open) => {
          if (!open) setEditingSubject(null)
        }}
      />

      <Dialog
        open={!!deletingSubject}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeletingSubject(null)
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Subject</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-medium text-foreground">
                {deletingSubject?.name} ({deletingSubject?.code})
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

AdminSubjectsIndexPage.layout = [AdminLayout]

function SortableHeader({ column, label }: { column: Column<Data.Subject>; label: string }) {
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
