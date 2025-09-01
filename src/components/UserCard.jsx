import { useDispatch, useSelector } from "react-redux";
import {
  openDetails,
  toggleFavourite,
  selectFavourites,
} from "../features/users/usersSlice";

export default function UserCard({ user }) {
  const dispatch = useDispatch();
  const favs = useSelector(selectFavourites);
  const isFav = !!favs[user.id];

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
        <button
          onClick={() => dispatch(toggleFavourite(user.id))}
          className={`rounded-full px-3 py-1 text-sm border ${
            isFav
              ? "bg-yellow-400/20 border-yellow-500 text-yellow-700 dark:text-yellow-300"
              : "border-gray-300 dark:border-gray-700"
          }`}
          aria-pressed={isFav}
        >
          {isFav ? "★ Favourite" : "☆ Favourite"}
        </button>
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Company:</span> {user.company?.name}
        </p>
        <p>
          <span className="font-medium">City:</span> {user.address?.city}
        </p>
      </div>

      <div className="mt-4">
        <button
          onClick={() => dispatch(openDetails(user.id))}
          className="rounded-xl bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
