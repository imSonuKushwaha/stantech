import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  selectFilteredUsers,
  selectStatus,
  selectError,
} from "../features/users/usersSlice";
import UserCard from "./UserCard";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(selectFilteredUsers);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-gray-600">Loading users...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (!users.length) {
    return (
      <p className="text-gray-600">No users found. Try a different search.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
}
