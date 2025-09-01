import { useSelector } from "react-redux";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import Modal from "./components/Modal";
import { selectAllUsers, selectSelectedId } from "./features/users/usersSlice";

export default function App() {
  const users = useSelector(selectAllUsers);
  const selectedId = useSelector(selectSelectedId);
  const selected = users.find((u) => u.id === selectedId);

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100"
      style={{
        width: "99vw",
      }}
    >
      <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-4">
          <div className="h-9 w-9 rounded-2xl bg-indigo-600" />
          <h1 className="text-xl font-bold">Users Directory</h1>
          <div className="ml-auto" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <SearchBar />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Powered by JSONPlaceholder
          </p>
        </div>

        <UserList />
      </main>

      <Modal open={!!selected}>
        {selected && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              {selected.name} (@{selected.username})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-medium">Contact</p>
                {/* <p>username: {selected.username}</p>
                <p>Name: {selected.name}</p> */}
                <p>Email: {selected.email}</p>
                <p>Phone: {selected.phone}</p>
                <p>Website: {selected.website}</p>
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p>
                  {selected.address?.suite}, {selected.address?.street}
                </p>
                <p>
                  {selected.address?.city} {selected.address?.zipcode}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-medium">Company</p>
                <p>{selected.company?.name}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {selected.company?.catchPhrase}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Users Directory • React + Redux Toolkit +
        Tailwind
      </footer>
    </div>
  );
}
