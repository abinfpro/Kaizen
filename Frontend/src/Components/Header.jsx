import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthed } = useSelector((s) => s.auth);

  return (
    <div className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-bold">Treatment Management</h1>
      {isAuthed && (
        <button
          onClick={() => dispatch(logout())}
          className="px-3 py-2 rounded-xl text-sm font-medium border hover:bg-gray-50"
        >
          Logout
        </button>
      )}
    </div>
  );
}
