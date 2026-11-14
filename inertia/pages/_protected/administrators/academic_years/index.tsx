import { Head } from "@inertiajs/react";
import AdminLayout from "~/layouts/admin_layout";

export default function AdminAcademicYearsIndexPage() {
  return (
    <>
      <Head title="Academic Years" />
    </>
  )
}

AdminAcademicYearsIndexPage.layout = [AdminLayout]