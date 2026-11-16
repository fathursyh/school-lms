import { Form } from '@adonisjs/inertia/react'
import { type Data } from '@generated/data'
import { Head } from '@inertiajs/react'
import { type Column, type ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, Plus } from 'lucide-react'
import React from 'react'
import { DataTable } from '~/components/shared/data_table'
import { Badge } from '~/components/ui/badge'
import { Button, buttonVariants } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { FieldGroup, Field, FieldLabel, FieldError } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import AdminLayout from '~/layouts/admin_layout'

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

const columns: ColumnDef<Data.AcademicYear>[] = [
  {
    id: 'rowNumber',
    header: 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'year',
    header: ({ column }) => <SortableHeader column={column} label="Year" />,
  },
  { accessorKey: 'semester', header: 'Semester' },
  {
    accessorKey: 'isActive',
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
        {row.original.isActive ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
]

const currentYear = new Date().getFullYear()

function AcademicYearForm() {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        <Plus />
        Create New Year
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <Form
          route="administrators.academic_years.store"
          onSuccess={() => setOpen(false)}
          noValidate
          options={{ only: ['academicYears'] }}
        >
          {({ errors, processing }) => (
            <>
              <DialogHeader>
                <DialogTitle>Create New Academic Year</DialogTitle>
                <DialogDescription>
                  Make a new academic year here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup className="my-4">
                <Field>
                  <FieldLabel htmlFor="year">Year</FieldLabel>
                  <Input
                    id="year"
                    type="number"
                    min={2000}
                    max={2100}
                    name="year"
                    defaultValue={currentYear}
                  />
                  {errors.year && <FieldError>{errors.year}</FieldError>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="semester">Semester</FieldLabel>
                  <RadioGroup
                    id="semester"
                    name="semester"
                    defaultValue="ODD"
                    className="w-fit flex gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="ODD" id="odd" />
                      <FieldLabel htmlFor="odd">Odd</FieldLabel>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="EVEN" id="even" />
                      <FieldLabel htmlFor="even">Even</FieldLabel>
                    </div>
                  </RadioGroup>
                  {errors.semester && <FieldError>{errors.semester}</FieldError>}
                </Field>
              </FieldGroup>
              <DialogFooter className="mt-8">
                <DialogClose className={buttonVariants({ variant: 'ghost' })}>
                  Cancel
                </DialogClose>
                <Button type="submit" disabled={processing}>
                  Save changes
                </Button>
              </DialogFooter>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  )
}
