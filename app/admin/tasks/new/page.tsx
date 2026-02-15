import { cookies } from "next/headers";
import { requireAdminFromCookies } from "@/src/server/auth/session";
import { listTaskTypes } from "@/src/server/taskTypes";

export default async function AdminNewTaskPage() {
  await requireAdminFromCookies(cookies());
  const types = listTaskTypes();

  return (
    <div className="grid">
      <div className="card">
        <h1 className="h1">Create New Task</h1>
        <p className="p">
          এখানে শুধু basic info দাও। Submission fields JSON আকারে দাও—UI অটো ফর্ম বানাবে।
        </p>
      </div>

      <div className="card">
        <form className="grid" action="/api/admin/tasks/create" method="post">
          <div>
            <label className="label">Title</label>
            <input className="input" name="title" required />
          </div>

          <div>
            <label className="label">Description</label>
            <input className="input" name="description" required />
          </div>

          <div className="grid grid-2">
            <div>
              <label className="label">Type</label>
              <select className="input" name="type" required>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Reward</label>
              <input className="input" name="reward" type="number" min="0" step="1" required />
            </div>
          </div>

          <div>
            <label className="label">Config JSON (submissionFields etc.)</label>
            <textarea
              className="input"
              name="configJson"
              rows={10}
              defaultValue={`{
  "submissionFields": [
    { "key": "reference", "label": "Reference", "type": "text", "required": true, "placeholder": "ABC123" }
  ],
  "verification": { "mode": "MANUAL" }
}`}
            />
            <div className="small">
              Field types: <span className="badge">text</span> <span className="badge">number</span> <span className="badge">image</span>
            </div>
          </div>

          <button className="btn" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
