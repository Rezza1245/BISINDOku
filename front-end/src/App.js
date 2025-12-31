import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Materi from "./pages/Materi";
import UploadMateri from "./pages/UploadMateri";
import UploadBab from "./pages/UploadBab";
import UploadKonten from "./pages/UploadKonten";
import Konten from "./pages/Konten";
import Bab from "./pages/Bab";
import Kamus from "./pages/Kamus";
import UpdateMateri from "./pages/UpdateMateri";
import UpdateBab from "./pages/UpdateBab";
import UpdateKonten from "./pages/UpdateKonten";
import Forum from "./pages/Forum";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/materi" element={<ProtectedRoute><Materi /></ProtectedRoute>} />
        <Route path="/materi/:id_materi" element={<ProtectedRoute><Bab /></ProtectedRoute>} />
        <Route path="/bab/:id_bab" element={<ProtectedRoute><Konten /></ProtectedRoute>} />
        <Route path="/upload-materi" element={<UploadMateri />} />
        <Route path="/upload-bab/:id_materi" element={<UploadBab />} />
        <Route path="/upload-konten/:id_bab" element={<UploadKonten />} />
        <Route path="/update-materi/:id_materi" element={<UpdateMateri />} />
        <Route path="/update-bab/:id_bab" element={<UpdateBab />} />
        <Route path="/update-konten/:id_konten" element={<ProtectedRoute><UpdateKonten /></ProtectedRoute>} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/kamus" element={<Kamus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
