import { useState, useMemo } from "react";

export default function AddTreatmentModal({ open, onClose, onSelect }) {
  const [query, setQuery] = useState("");

  const catalog = useMemo(
    () => [
      { id: "t1", name: "Chemotherapy" },
      { id: "t2", name: "Radiation Therapy" },
      { id: "t3", name: "Immunotherapy" },
      { id: "t4", name: "Physical Therapy" },
      { id: "t5", name: "Dialysis" },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? catalog.filter((c) => c.name.toLowerCase().includes(q)) : catalog;
  }, [catalog, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Treatment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
        </div>
        <div className="mt-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search treatments..."
            className="w-full rounded-xl border px-3 py-2"
          />
        </div>
        <div className="mt-3 max-h-64 overflow-auto divide-y">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelect(t)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50"
            >
              {t.name}
            </button>
          ))}
          {filtered.length === 0 && <div className="px-3 py-6 text-gray-500 text-sm">No matches</div>}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border">Close</button>
        </div>
      </div>
    </div>
  );
}
