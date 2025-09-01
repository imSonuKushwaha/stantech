import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearch } from "../features/users/usersSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const value = useSelector(selectSearch);

  return (
    <div className="w-full max-w-xl">
      <input
        value={value}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Search by name, username, email, or company..."
        className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
