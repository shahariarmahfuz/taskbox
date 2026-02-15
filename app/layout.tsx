import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";
import { getUserFromRequestCookies } from "@/src/server/auth/session";

export const metadata = {
  title: "Task Earning Platform (JSON DB)",
  description: "Prototype on JSON storage"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const jar = cookies();
  const user = await getUserFromRequestCookies(jar);

  return (
    <html lang="bn">
      <body>
        <div className="container">
          <div className="nav">
            <div className="nav-left">
              <Link className="brand" href="/">TASKBOX</Link>
              <Link href="/tasks">Tasks</Link>
              {user ? <Link href="/dashboard">Dashboard</Link> : null}
              {user?.role === "ADMIN" ? <Link href="/admin">Admin</Link> : null}
            </div>
            <div className="row">
              {user ? (
                <>
                  <span className="badge">{user.email} · {user.role}</span>
                  <form action="/api/auth/logout" method="post">
                    <button className="btn btn-secondary" type="submit">Logout</button>
                  </form>
                </>
              ) : (
                <>
                  <Link className="btn btn-secondary" href="/login">Login</Link>
                  <Link className="btn" href="/signup">Sign up</Link>
                </>
              )}
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
