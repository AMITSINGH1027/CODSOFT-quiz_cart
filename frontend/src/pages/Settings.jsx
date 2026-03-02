import AdminLayout from "../components/AdminLayout";

function Settings() {
  return (
    <AdminLayout>
      <div className="p-8 text-white">
        <h2 className="text-3xl text-black font-bold mb-8">
          ⚙ Admin Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Quiz Settings */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              📝 Quiz Settings
            </h3>

            <label className="block mb-2 text-gray-400">
              Default Quiz Time (minutes)
            </label>
            <input
              type="number"
              className="w-full bg-slate-900 p-3 rounded-lg mb-4"
              placeholder="30"
            />

            <label className="block mb-2 text-gray-400">
              Max Attempts Per User
            </label>
            <input
              type="number"
              className="w-full bg-slate-900 p-3 rounded-lg"
              placeholder="3"
            />
          </div>

          {/* Admin Settings */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              🔐 Admin Controls
            </h3>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg mb-4">
              Backup Database
            </button>

            <button className="w-full bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg mb-4">
              Reset All Quiz Attempts
            </button>

            <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg">
              Clear All Results
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

export default Settings;