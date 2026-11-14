import { Head } from "@inertiajs/react";
import AdminLayout from "~/layouts/admin_layout";

export default function AdminExtracurricularsIndexPage() {
  return (
    <>
      <Head title="Extracurriculars" />
    </>
  )
}

AdminExtracurricularsIndexPage.layout = [AdminLayout]