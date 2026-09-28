import {Route, Routes } from "react-router-dom";
import DocksPage from "./pages/DocksPage";
import DockDetailPage from "./pages/DockDetailPage";
import RequestsPage from "./pages/RequestsPage";
import NewRequestPage from "./pages/NewRequestPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./components/AppLayout";

export default function App() {
 return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/docks" element={<DocksPage />} />
        <Route path="/docks/:dockId" element={<DockDetailPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/requests/new" element={<NewRequestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}