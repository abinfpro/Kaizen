import Header from "../Components/Header";
import TreatmentList from "../Components/TreatmentList";

export default function LandingPage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Header />
      <div className="rounded-2xl border p-4 bg-white">
        <TreatmentList />
      </div>
    </div>
  );
}
