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
import UserForm from '~/components/users/user_form'
import AdminLayout from '~/layouts/admin_layout'

interface AdminAdministratorsPageProps {
  administrators: Data.User[]
}

export default function AdminAdministratorsIndexPage({
  administrators,
}: AdminAdministratorsPageProps) {
  const [editingAdministrator, setEditingAdministrator] = React.useState<Data.User | null>(null)
  const [deletingAdministrator, setDeletingAdministrator] = React.useState<Data.User | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const columns = React.useMemo<ColumnDef<Data.User>[]>(
    () => [
      {
        id: 'rowNumber',
        header: 'No',
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'identifier',
        header: ({ column }) => <SortableHeader column={column} label="Identifier" />,
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
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <ActionMenu
            onEdit={() => setEditingAdministrator(row.original)}
            onDelete={() => setDeletingAdministrator(row.original)}
          />
        ),
      },
    ],
    []
  )

  function handleDeleteConfirm() {
    if (!deletingAdministrator) return

    setIsDeleting(true)
    router.delete(
      urlFor('administrators.administrators.destroy', { id: deletingAdministrator.id }),
      {
        only: ['administrators'],
        onSuccess: () => setDeletingAdministrator(null),
        onFinish: () => setIsDeleting(false),
      }
    )
  }

  return (
    <>
      <Head title="Administrators" />
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Administrators</h2>
          <p className="text-sm text-muted-foreground">Manage school&apos;s administrators</p>
        </div>
        <DataTable
          search={{ placeholder: 'Search administrators...' }}
          columns={columns}
          data={administrators}
          actions={
            <UserForm
              roleLabel="Administrator"
              action={urlFor('administrators.administrators.store')}
              onlyProp="administrators"
            />
          }
        />
      </div>

      <UserForm
        roleLabel="Administrator"
        action={
          editingAdministrator
            ? urlFor('administrators.administrators.update', { id: editingAdministrator.id })
            : ''
        }
        onlyProp="administrators"
        user={editingAdministrator}
        open={!!editingAdministrator}
        onOpenChange={(open) => {
          if (!open) setEditingAdministrator(null)
        }}
      />

      <Dialog
        open={!!deletingAdministrator}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeletingAdministrator(null)
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Administrator</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-medium text-foreground">
                {deletingAdministrator?.name} ({deletingAdministrator?.identifier})
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

AdminAdministratorsIndexPage.layout = [AdminLayout]

function SortableHeader({ column, label }: { column: Column<Data.User>; label: string }) {
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
