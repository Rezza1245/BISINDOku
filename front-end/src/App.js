import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Materi from "./pages/Materi";
import UploadMateri from "./pages/UploadMateri";
import UploadKonten from "./pages/UploadKonten";
import Konten from "./pages/Konten";
import Bab from "./pages/Bab";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/materi" element={<Materi />} />
        <Route path="/upload-konten" element={<UploadKonten />} />
        <Route path="/upload-materi" element={<UploadMateri />} />
        <Route path="/bab/:id_materi" element={<Bab />} />
        <Route path="/materi/:id_materi" element={<Bab />} />
        <Route path="/konten/:id_bab" element={<Konten />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
