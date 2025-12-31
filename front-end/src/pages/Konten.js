import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Materi.css";

export default function Konten() {
    const { id_bab } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [kontenList, setKontenList] = useState([]);

    // fetch konten dari backend
    const fetchKonten = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `http://localhost:3000/api/bab/${id_bab}/konten`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setKontenList(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchKonten();
    }, [id_bab]);

    return (
        <div className="update-container">
            <h2 className="materi-title">Daftar Konten</h2>

            {user?.role === "admin" && (
                <button
                    className="upload-btn"
                    onClick={() => navigate(`/upload-konten/${id_bab}`)}
                >
                    + Tambah Konten
                </button>
            )}

            <div className="materi-grid">
                {kontenList.length > 0 ? (
                    kontenList.map((k) => (
                        <div key={k.id_konten} className="materi-card">
                            <h3>{k.judul}</h3>

                            {/* TEKS */}
                            {k.tipe === "teks" && (
                                <p>{k.content_text}</p>
                            )}

                            {/* QUIS / LINK */}
                            {k.tipe === "quis" && (
                                <a
                                    href={k.content_text}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="quiz-link"
                                >
                                    Kerjakan Kuis
                                </a>
                            )}

                            {/* GAMBAR */}
                            {k.tipe === "gambar" && (
                                <img
                                    src={`http://localhost:3000/${k.file_path}`}
                                    alt={k.judul}
                                    className="materi-image"
                                />
                            )}

                            {/* VIDEO */}
                            {k.tipe === "video" && (
                                <video controls width="100%">
                                    <source src={`http://localhost:3000/${k.file_path}`} />
                                </video>
                            )}
                            {/* Tombol Update & Delete untuk admin */}
                            {user?.role === "admin" && (
                                <div className="materi-actions">
                                    <button onClick={() => navigate(`/update-konten/${k.id_konten}`)}>
                                        Update
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (!window.confirm("Yakin ingin hapus konten ini?")) return;
                                            try {
                                                const token = localStorage.getItem("token");
                                                await axios.delete(`http://localhost:3000/api/konten/${k.id_konten}`, {
                                                    headers: { Authorization: `Bearer ${token}` },
                                                });
                                                fetchKonten(); // refresh list setelah delete
                                            } catch (err) {
                                                console.error("Gagal hapus konten:", err);
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
                    <p>Belum ada konten</p>
                )}
            </div>


        </div>
    );
}
