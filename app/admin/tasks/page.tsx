import Link from "next/link";
import { cookies } from "next/headers";
import { requireAdminFromCookies } from "@/src/server/auth/session";
import { listAllTasks } from "@/src/server/services/tasks";

export default async function AdminTasksPage() {
  await requireAdminFromCookies(cookies());
  const tasks = await listAllTasks();

  return (
    <div className="grid">
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <h1 className="h1">Manage Tasks</h1>
            <p className="p">Create, publish, and manage task types</p>
          </div>
          <Link className="btn" href="/admin/tasks/new">New Task</Link>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Reward</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>#{t.id}</td>
                <td>{t.title}</td>
                <td>{t.type}</td>
                <td>{t.status}</td>
                <td>{t.reward}</td>
                <td>
                  <form action="/api/admin/tasks/publish" method="post">
                    <input type="hidden" name="taskId" value={t.id} />
                    <button className="btn btn-secondary" type="submit" disabled={t.status === "PUBLISHED"}>
                      Publish
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
