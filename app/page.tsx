import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid">
      <div className="card">
        <h1 className="h1">TaskBox (Prototype)</h1>
        <p className="p">
          এটা একটা JSON file-based prototype। User টাস্ক ক্লেইম করে সাবমিট করতে পারবে, Admin ম্যানুয়ালি রিভিউ করে approve/reject করবে।
        </p>
        <hr className="hr" />
        <div className="row">
          <Link className="btn" href="/tasks">Browse Tasks</Link>
          <Link className="btn btn-secondary" href="/signup">Create account</Link>
          <Link className="btn btn-secondary" href="/login">Login</Link>
        </div>
      </div>

      <div className="card">
        <div className="h2">Task Types (Plugin)</div>
        <p className="p">
          নতুন task type যোগ করতে হলে: <code>src/server/taskTypes</code> এ নতুন ফাইল + রেজিস্ট্রি আপডেট। UI অটো-ফর্ম বানায় task config এর <code>submissionFields</code> দেখে।
        </p>
      </div>
    </div>
  );
}
