import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Root() {
  const { isAuthed } = useSelector((s) => s.auth);

  return (
    <Routes>
      {isAuthed ? (
        <Route path="/*" element={<LandingPage />} />
      ) : (
        <Route path="/*" element={<LoginPage />} />
      )}
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <Root />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
