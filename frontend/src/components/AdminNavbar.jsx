function AdminNavbar() {
  const email = localStorage.getItem("email");

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <p className="text-gray-600">Logged in as: {email}</p>
    </div>
  );
}

export default AdminNavbar;