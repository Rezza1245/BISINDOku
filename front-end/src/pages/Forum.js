import { useState, useEffect } from "react";
import axios from "axios";
import CreateTopik from "../components/CreateTopik";
import "../styles/Forum.css";

export default function Forum() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [topics, setTopics] = useState([]);
    // Tambahkan state untuk menangani teks reply
    const [replyText, setReplyText] = useState({});

    const fetchTopics = async () => {
    console.log("Memulai fetchTopics..."); // Log 1
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Token tidak ditemukan di localStorage!");
            return;
        }

        const res = await axios.get("http://localhost:3000/api/forum", {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("Data dari API muncul:", res.data); // Log 2
        setTopics(res.data);
    } catch (err) {
        console.error("Error saat fetch:", err.response || err); // Log 3
    }
};

    // Tambahkan fungsi handleReply yang sebelumnya hilang
    const handleReply = async (id_topik) => {
        const isiKomentar = replyText[id_topik];
        if (!isiKomentar?.trim()) return alert("Komentar tidak boleh kosong");

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:3000/api/forum/${id_topik}/komentar`,
                { isi: isiKomentar },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Komentar berhasil ditambahkan!");
            setReplyText({ ...replyText, [id_topik]: "" }); // Reset input field
            fetchTopics(); // Refresh data
        } catch (err) {
            console.error("Gagal membalas:", err);
            alert("Gagal mengirim balasan");
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    return (
    <div className="forum-container">
        <h2>Forum Diskusi</h2>

        {/* Form buat topik hanya untuk admin */}
        {user?.role === "admin" && <CreateTopik refreshTopics={fetchTopics} />}

        <div className="topic-list">
            {topics.length === 0 ? (
                <p>Belum ada topik, silakan tunggu atau buat topik baru.</p>
            ) : (
                topics.map((topic) => (
                    <div key={topic.id_topik} className="topic-card">
                        <h3>{topic.judul}</h3>
                        <p>{topic.deskripsi}</p>
                        <small>Dibuat oleh: {topic.created_by_name}</small>

                        <hr />

                        {/* --- STEP 3: DAFTAR KOMENTAR DIMULAI DI SINI --- */}
                        <div className="comments-section" style={{ marginLeft: '20px', marginTop: '10px' }}>
                            <h4>Komentar:</h4>
                            {topic.komentar && topic.komentar.length > 0 ? (
                                topic.komentar.map((kom) => (
                                    <div key={kom.id_komentar} style={{ marginBottom: '10px', borderLeft: '2px solid #ddd', paddingLeft: '10px' }}>
                                        <p style={{ margin: 0, fontSize: '0.9em' }}>
                                            <strong>{kom.sender_name || 'Anonim'}:</strong> {kom.isi}
                                        </p>
                                        <small style={{ color: '#888', fontSize: '0.75em' }}>
                                            {new Date(kom.created_at).toLocaleString('id-ID')}
                                        </small>
                                    </div>
                                ))
                            ) : (
                                <p style={{ fontSize: '0.8em', color: '#999' }}>Belum ada balasan.</p>
                            )}
                        </div>
                        {/* --- STEP 3 SELESAI --- */}

                        <hr />

                        {/* Input Reply */}
                        <div className="reply-section">
                            <input
                                type="text"
                                placeholder="Tulis balasan..."
                                value={replyText[topic.id_topik] || ""}
                                onChange={(e) =>
                                    setReplyText({
                                        ...replyText,
                                        [topic.id_topik]: e.target.value,
                                    })
                                }
                            />
                            <button onClick={() => handleReply(topic.id_topik)}>Reply</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);
} // Kurung penutup fungsi Forum yang tadinya hilang