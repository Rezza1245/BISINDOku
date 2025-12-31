const db = require("../config/db"); // pastikan ini koneksi DB

// GET semua topik
exports.getAllTopik = (req, res) => {
    const queryTopik = "SELECT t.*, u.username AS created_by_name FROM topik t LEFT JOIN users u ON t.created_by = u.id_user ORDER BY t.created_at DESC";

    db.query(queryTopik, (err, topiks) => {
        if (err) return res.status(500).json({ message: "Gagal ambil topik" });

        const queryKomentar = "SELECT k.*, u.username AS sender_name FROM komentar k LEFT JOIN users u ON k.created_by = u.id_user ORDER BY k.created_at ASC";

        db.query(queryKomentar, (err, komentars) => {
            if (err) return res.status(500).json({ message: "Gagal ambil komentar" });

            // LOG UNTUK DEBUGGING DI TERMINAL VS CODE
            console.log("Jumlah Komentar di DB:", komentars.length);

            const dataLengkap = topiks.map(topik => {
                const filteredKomentar = komentars.filter(k => 
                    Number(k.id_topik) === Number(topik.id_topik) // Paksa jadi Number agar cocok
                );
                
                return {
                    ...topik,
                    komentar: filteredKomentar
                };
            });

            res.json(dataLengkap);
        });
    });
};

// GET topik + komentar
exports.getTopikById = (req, res) => {
    const { id_topik } = req.params;

    const queryTopik = "SELECT * FROM topik WHERE id_topik = ?";
    db.query(queryTopik, [id_topik], (err, topik) => {
        if (err) return res.status(500).json({ message: "Gagal mengambil topik" });
        if (topik.length === 0) return res.status(404).json({ message: "Topik tidak ditemukan" });

        const queryKomentar = "SELECT * FROM komentar WHERE id_topik = ? ORDER BY created_at ASC";
        db.query(queryKomentar, [id_topik], (err, komentar) => {
            if (err) return res.status(500).json({ message: "Gagal mengambil komentar" });
            res.json({ topik: topik[0], komentar });
        });
    });
};

// POST buat topik baru (admin only)
exports.createTopik = (req, res) => {
    const { judul, deskripsi } = req.body;
    
    // Pastikan req.user ada (hasil dari authMiddleware)
    if (!req.user || !req.user.id_user) {
        return res.status(401).json({ message: "User tidak terautentikasi" });
    }

    const created_by = req.user.id_user;

    if (!judul || !deskripsi) {
        return res.status(400).json({ message: "Judul dan deskripsi wajib diisi" });
    }

    const query = "INSERT INTO topik (judul, deskripsi, created_by) VALUES (?, ?, ?)";
    db.query(query, [judul, deskripsi, created_by], (err, result) => {
        if (err) {
            console.error("Database Error:", err); // Log error ke console backend
            return res.status(500).json({ message: "Gagal membuat topik ke database" });
        }
        res.status(201).json({ message: "Topik berhasil dibuat", id_topik: result.insertId });
    });
};

// POST komentar di topik tertentu
exports.addKomentar = (req, res) => {
    const { id_topik } = req.params;
    const { isi } = req.body;
    const created_by = req.user.id_user;

    if (!isi) return res.status(400).json({ message: "Isi komentar wajib diisi" });

    const query = "INSERT INTO komentar (id_topik, isi, created_by) VALUES (?, ?, ?)";
    db.query(query, [id_topik, isi, created_by], (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal menambahkan komentar" });
        res.status(201).json({ message: "Komentar berhasil ditambahkan", id_komentar: result.insertId });
    });
};
