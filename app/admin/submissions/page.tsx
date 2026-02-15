import { cookies } from "next/headers";
import { requireAdminFromCookies } from "@/src/server/auth/session";
import { listPendingSubmissions, getTaskTitleMap } from "@/src/server/services/submissions";

export default async function AdminSubmissionsPage() {
  await requireAdminFromCookies(cookies());

  const [pending, titleMap] = await Promise.all([listPendingSubmissions(), getTaskTitleMap()]);

  return (
    <div className="grid">
      <div className="card">
        <h1 className="h1">Review Submissions</h1>
        <p className="p">Pending submissions approve/reject করো</p>
      </div>

      <div className="card">
        {pending.length === 0 ? (
          <p className="p">No pending submissions.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task</th>
                <th>User</th>
                <th>Payload</th>
                <th>Evidence</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((s) => (
                <tr key={s.id}>
                  <td>#{s.id}</td>
                  <td>
                    <div><b>#{s.taskId}</b> {titleMap[s.taskId] ? `· ${titleMap[s.taskId]}` : ""}</div>
                    <div className="small">{s.status}</div>
                  </td>
                  <td className="small">User #{s.userId}</td>
                  <td className="small">
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{JSON.stringify(s.payload, null, 2)}</pre>
                  </td>
                  <td className="small">
                    {s.evidence?.length ? (
                      <div className="grid">
                        {s.evidence.map((e, idx) => (
                          <a key={idx} href={e.url} target="_blank" rel="noreferrer">
                            {e.type}: {e.url}
                          </a>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <div className="row">
                      <form action="/api/admin/submissions/approve" method="post">
                        <input type="hidden" name="submissionId" value={s.id} />
                        <button className="btn btn-ok" type="submit">Approve</button>
                      </form>
                      <form action="/api/admin/submissions/reject" method="post">
                        <input type="hidden" name="submissionId" value={s.id} />
                        <button className="btn btn-danger" type="submit">Reject</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
