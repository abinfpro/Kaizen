import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreatments, addTreatment, removeTreatment } from "../features/treatments/treatmentsSlice";
import AddTreatmentModal from "./AddTreatmentModal";
import toast from "react-hot-toast";

export default function TreatmentList() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.treatments);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTreatments())
      .unwrap()
      .catch((e) => toast.error(e.message || "Failed to load treatments"));
  }, [dispatch]);

  const handleSelect = async (t) => {
    if (items.some((i) => i.id === t.id)) {
      toast("Treatment already in list", { icon: "⚠️" });
      return;
    }
    try {
      await dispatch(addTreatment(t)).unwrap();
      toast.success("Treatment added");
      setOpen(false);
    } catch (e) {
      toast.error(e.message || "Failed to add treatment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(removeTreatment(id)).unwrap();
      toast.success("Removed");
    } catch (e) {
      toast.error(e.message || "Failed to remove");
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Your Treatments</h3>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
        >
          + Add
        </button>
      </div>

      {status === "loading" && <div className="animate-pulse text-sm text-gray-500">Loading...</div>}

      <ul className="grid md:grid-cols-2 gap-3">
        {items.map((t) => (
          <li key={t.id} className="border rounded-2xl p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{t.name}</div>
              <div className="text-xs text-gray-500">ID: {t.id}</div>
            </div>
            <button
              onClick={() => handleDelete(t.id)}
              className="px-3 py-1.5 text-sm rounded-xl border hover:bg-gray-50"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <AddTreatmentModal open={open} onClose={() => setOpen(false)} onSelect={handleSelect} />
    </div>
  );
}
