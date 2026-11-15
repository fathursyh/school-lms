import { Link } from "@adonisjs/inertia/react";
import { Data } from "@generated/data";
import { Head } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { DataTable } from "~/components/shared/data_table";
import { buttonVariants } from "~/components/ui/button";
import AdminLayout from "~/layouts/admin_layout";

interface AdminAcademicYearsPageProps {
  academicYears: Data.AcademicYear[]
}

export default function AdminAcademicYearsIndexPage({ academicYears }: AdminAcademicYearsPageProps) {
  return (
    <>
      <Head title="Academic Years" />
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Academic Years</h2>
          <p className="text-sm text-muted-foreground">
            Manage school&apos;s academic years
          </p>
        </div>
        <DataTable
          search={{ placeholder: 'Search academic years...' }}
          columns={columns}
          data={academicYears}
          actions={
            <Link route="administrators.academic_years.create" className={buttonVariants({})}>
              <Plus />
              Create New
            </Link>
          }
        />
      </div>
    </>
  )
}

AdminAcademicYearsIndexPage.layout = [AdminLayout]

const columns: ColumnDef<Data.AcademicYear>[] = [
  {
    id: 'rowNumber',
    header: 'No',
    cell: ({ row }) => row.index + 1,
  },
  { accessorKey: "year", header: "Year" },
  { accessorKey: "semester", header: "Semester" },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (row.original.isActive ? "Active" : "Inactive"),
  },
]