import Link from "next/link";
import { cookies } from "next/headers";
import { requireAdminFromCookies } from "@/src/server/auth/session";
import { listAllTasks } from "@/src/server/services/tasks";
import { listPendingSubmissions } from "@/src/server/services/submissions";

export default async function AdminDashboardPage() {
  await requireAdminFromCookies(cookies());

  const [tasks, pending] = await Promise.all([listAllTasks(), listPendingSubmissions()]);

  return (
    <div className="grid">
      <div className="card">
        <h1 className="h1">Admin Dashboard</h1>
        <div className="row">
          <span className="badge">Tasks: {tasks.length}</span>
          <span className="badge">Pending submissions: {pending.length}</span>
        </div>
        <hr className="hr" />
        <div className="row">
          <Link className="btn" href="/admin/tasks">Manage Tasks</Link>
          <Link className="btn btn-secondary" href="/admin/submissions">Review Submissions</Link>
        </div>
      </div>
    </div>
  );
}
