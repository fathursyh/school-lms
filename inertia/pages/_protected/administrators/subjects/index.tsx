import { Head } from "@inertiajs/react";
import AdminLayout from "~/layouts/admin_layout";

export default function AdminSubjectsIndexPage() {
  return (
    <>
      <Head title="Subjects" />
    </>
  )
}

AdminSubjectsIndexPage.layout = [AdminLayout]