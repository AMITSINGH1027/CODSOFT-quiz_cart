import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        <AdminNavbar />

        <div className="p-8">
          {children}
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;