import { useDispatch } from "react-redux";
import { closeDetails } from "../features/users/usersSlice";

export default function Modal({ open, children }) {
  const dispatch = useDispatch();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => dispatch(closeDetails())}
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl">
        {children}
        <div className="mt-6 text-right">
          <button
            onClick={() => dispatch(closeDetails())}
            className="rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
