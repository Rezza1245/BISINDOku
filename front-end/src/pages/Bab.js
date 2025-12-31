import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Materi.css";

export default function Bab() {
    const { id_materi } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [materi, setMateri] = useState(null);
    const [babList, setBabList] = useState([]);
    // fungsi untuk fetch daftar Bab dari backend
    const fetchBab = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/materi/${id_materi}/bab`);
            setBabList(res.data);
        } catch (err) {
            console.error("Gagal fetch bab:", err);
        }
    };

    useEffect(() => {
        // ambil detail materi
        const fetchMateri = async () => {
            try {
                // ambil detail materi
                const materiRes = await axios.get(`http://localhost:3000/api/materi/${id_materi}`);
                setMateri(materiRes.data);

                // ambil daftar bab
                const babRes = await axios.get(`http://localhost:3000/api/materi/${id_materi}/bab`);
                setBabList(babRes.data);
            } catch (err) {
                console.error("Gagal fetch materi atau bab:", err);
            }
        };

        fetchMateri();
        fetchBab();
    }, [id_materi]);

    return (
        <div className="update-container">
            <h2>Daftar Bab</h2>

            {/* Tombol tambah Bab, hanya admin */}
            {user?.role === "admin" && (
                <button onClick={() => navigate(`/upload-bab/${id_materi}`)}>
                    + Tambah Bab
                </button>
            )}

            <div className="materi-grid">
                {babList.length > 0 ? (
                    babList.map((bab) => (
                        <div key={bab.id_bab} className="materi-card"
                        onClick={() => navigate(`/bab/${bab.id_bab}`)}>
                            <h3>{bab.judul_bab}</h3>

                            {/* Tombol Update & Delete, hanya untuk admin */}
                            {user?.role === "admin" && (
                                <div className="materi-actions" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() =>
                                            navigate(`/update-bab/${bab.id_bab}`) // navigasi ke halaman update Bab
                                        }
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            if (!window.confirm("Yakin ingin hapus bab ini?")) return;
                                            try {
                                                const token = localStorage.getItem("token");
                                                await axios.delete(`http://localhost:3000/api/bab/${bab.id_bab}`, {
                                                    headers: { Authorization: `Bearer ${token}` },
                                                });
                                                fetchBab(); // refresh list setelah delete
                                            } catch (err) {
                                                console.error("Gagal hapus bab:", err);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>

                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Belum ada bab tersedia</p>
                )}
            </div>
        </div>
    );
}
