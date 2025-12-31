import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Kamus.css";
export default function Kamus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedLetterVideo, setSelectedLetterVideo] = useState(null);

  // Alphabet mapping dengan image files
  const alphabetSigns = {
    A: "/images/A.png",
    B: "/images/B.png",
    C: "/images/C.png",
    D: "/images/D.png",
    E: "/images/E.png",
    F: "/images/F.png",
    G: "/images/G.png",
    H: "/images/H.png",
    I: "/images/I.png",
    J: "/images/J.png",
    K: "/images/K.png",
    L: "/images/L.png",
    M: "/images/M.png",
    N: "/images/N.png",
    O: "/images/O.png",
    P: "/images/P.png",
    Q: "/images/Q.png",
    R: "/images/R.png",
    S: "/images/S.png",
    T: "/images/T.png",
    U: "/images/U.png",
    V: "/images/V.png",
    W: "/images/W.png",
    X: "/images/X.png",
    Y: "/images/Y.png",
    Z: "/images/Z.png",
  };

  // Kamus data dengan detail
  const kamusData = [
    // Huruf A
    { id: 1, letter: "A", word: "Air", description: "Cairan jernih yang penting untuk kehidupan", gesture: "✋", category: "Alam" },
    { id: 2, letter: "A", word: "Ayah", description: "Orangtua laki-laki", gesture: "👋", category: "Keluarga" },
    { id: 3, letter: "A", word: "Anak", description: "Keturunan manusia", gesture: "🤚", category: "Keluarga" },

    // Huruf B
    { id: 4, letter: "B", word: "Buku", description: "Benda yang berisi tulisan atau gambar", gesture: "🖐️", category: "Benda" },
    { id: 5, letter: "B", word: "Bapak", description: "Sapaan untuk ayah atau orang yang lebih tua", gesture: "👋", category: "Keluarga" },
    { id: 6, letter: "B", word: "Binatang", description: "Makhluk hidup selain manusia dan tumbuhan", gesture: "🖐️", category: "Alam" },

    // Huruf C
    { id: 7, letter: "C", word: "Cinta", description: "Perasaan kasih sayang yang mendalam", gesture: "👌", category: "Emosi" },
    { id: 8, letter: "C", word: "Cerita", description: "Narasi atau kisah yang diceritakan", gesture: "👌", category: "Komunikasi" },

    // Huruf D
    { id: 9, letter: "D", word: "Doa", description: "Permohonan kepada Tuhan", gesture: "☝️", category: "Agama" },
    { id: 10, letter: "D", word: "Dunia", description: "Planet tempat kita tinggal", gesture: "☝️", category: "Alam" },

    // Huruf E
    { id: 11, letter: "E", word: "Enak", description: "Berasa nikmat atau menyenangkan", gesture: "🤟", category: "Emosi" },

    // Huruf F
    { id: 12, letter: "F", word: "Fardu", description: "Kewajiban dalam agama Islam", gesture: "🤞", category: "Agama" },

    // Huruf G
    { id: 13, letter: "G", word: "Gembira", description: "Perasaan senang dan bahagia", gesture: "👉", category: "Emosi" },
    { id: 14, letter: "G", word: "Guru", description: "Pendidik yang mengajar", gesture: "👉", category: "Profesi" },

    // Huruf H
    { id: 15, letter: "H", word: "Halo", description: "Ucapan sapaan", gesture: "✋", category: "Komunikasi" },
    { id: 16, letter: "H", word: "Hari", description: "Periode waktu 24 jam", gesture: "✋", category: "Waktu" },

    // Huruf I
    { id: 17, letter: "I", word: "Ibu", description: "Orangtua perempuan", gesture: "☝️", category: "Keluarga" },
    { id: 18, letter: "I", word: "Iman", description: "Kepercayaan kepada Tuhan", gesture: "☝️", category: "Agama" },

    // Huruf J
    { id: 19, letter: "J", word: "Jalan", description: "Sesuatu yang dilalui untuk berpindah tempat", gesture: "👊", category: "Gerakan" },
    { id: 20, letter: "J", word: "Jam", description: "Alat pengukur waktu", gesture: "👊", category: "Benda" },

    // Huruf K
    { id: 21, letter: "K", word: "Kakak", description: "Saudara yang lebih tua", gesture: "🤘", category: "Keluarga" },
    { id: 22, letter: "K", word: "Kampus", description: "Lingkungan pendidikan tinggi", gesture: "🤘", category: "Tempat" },

    // Huruf L
    { id: 23, letter: "L", word: "Lari", description: "Bergerak cepat dengan kaki", gesture: "👆", category: "Gerakan" },
    { id: 24, letter: "L", word: "Laut", description: "Kumpulan air asin yang luas", gesture: "👆", category: "Alam" },

    // Huruf M
    { id: 25, letter: "M", word: "Mama", description: "Panggilan untuk ibu", gesture: "👏", category: "Keluarga" },
    { id: 26, letter: "M", word: "Mata", description: "Organ penglihatan", gesture: "👏", category: "Tubuh" },

    // Huruf N
    { id: 27, letter: "N", word: "Nama", description: "Sebutan untuk identitas", gesture: "✌️", category: "Komunikasi" },
    { id: 28, letter: "N", word: "Nenek", description: "Ibu dari ayah atau ibu", gesture: "✌️", category: "Keluarga" },

    // Huruf O
    { id: 29, letter: "O", word: "Orang", description: "Makhluk manusia", gesture: "⭕", category: "Makhluk" },

    // Huruf P
    { id: 30, letter: "P", word: "Pagi", description: "Waktu antara fajar hingga tengah hari", gesture: "👉", category: "Waktu" },
    { id: 31, letter: "P", word: "Papa", description: "Panggilan untuk ayah", gesture: "👉", category: "Keluarga" },

    // Huruf Q
    { id: 32, letter: "Q", word: "Quran", description: "Kitab suci umat Islam", gesture: "🤞", category: "Agama" },

    // Huruf R
    { id: 33, letter: "R", word: "Rasa", description: "Kesan yang dirasakan", gesture: "✌️", category: "Emosi" },
    { id: 34, letter: "R", word: "Rumah", description: "Tempat tinggal", gesture: "✌️", category: "Tempat" },

    // Huruf S
    { id: 35, letter: "S", word: "Saya", description: "Diri sendiri (pronoun)", gesture: "✊", category: "Komunikasi" },
    { id: 36, letter: "S", word: "Sahabat", description: "Teman yang akrab", gesture: "✊", category: "Hubungan" },

    // Huruf T
    { id: 37, letter: "T", word: "Tangan", description: "Anggota tubuh untuk memegang", gesture: "👍", category: "Tubuh" },
    { id: 38, letter: "T", word: "Telinga", description: "Organ pendengaran", gesture: "👍", category: "Tubuh" },

    // Huruf U
    { id: 39, letter: "U", word: "Umur", description: "Lama hidup seseorang", gesture: "✌️", category: "Waktu" },

    // Huruf V
    { id: 40, letter: "V", word: "Vitali", description: "Penting dan sangat diperlukan", gesture: "✌️", category: "Sifat" },

    // Huruf W
    { id: 41, letter: "W", word: "Wajah", description: "Bagian depan kepala", gesture: "🤚", category: "Tubuh" },
    { id: 42, letter: "W", word: "Waktu", description: "Durasi atau periode tertentu", gesture: "🤚", category: "Waktu" },

    // Huruf X
    { id: 43, letter: "X", word: "Xtras", description: "Hal-hal tambahan", gesture: "🤞", category: "Umum" },

    // Huruf Y
    { id: 44, letter: "Y", word: "Yang", description: "Kata penunjuk", gesture: "🤘", category: "Komunikasi" },

    // Huruf Z
    { id: 45, letter: "Z", word: "Ziarah", description: "Mengunjungi tempat tertentu dengan niat khusus", gesture: "⭕", category: "Aktivitas" },
  ];

  // Filter data berdasarkan search atau letter
  const filteredData = kamusData.filter((item) => {
    const matchesSearch = searchQuery === "" || item.word.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLetter = selectedLetter === "" || item.letter === selectedLetter;
    return matchesSearch && matchesLetter;
  });

  // Group by letter untuk display
  const groupedData = {};
  filteredData.forEach((item) => {
    if (!groupedData[item.letter]) {
      groupedData[item.letter] = [];
    }
    groupedData[item.letter].push(item);
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedLetter("");
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(selectedLetter === letter ? "" : letter);
    setSelectedLetterVideo(letter);
    setSearchQuery("");
    setSelectedWord(null);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}


        <nav className="nav-menu">
          <Link to="/dashboard" className="nav-item">
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </Link>
        </nav>

      {/* Main Content */}
      <main className="main-content kamus-main">
        <div className="overview-header">OVERVIEW</div>

        {/* Search Section */}
        <div className="search-section kamus-search">
          <h3>Cari kata dalam bahasa isyarat</h3>
          <form onSubmit={handleSearch} className="search-form">
            <input type="text" placeholder="Cari kata..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>
        </div>

        {/* Alphabet Section */}
        <div className="alphabet-section kamus-alphabet">
          <h3>Cari Berdasarkan Huruf</h3>
          <div className="alphabet-grid">
            {Object.keys(alphabetSigns).map((letter) => (
              <button key={letter} className={`alphabet-btn ${selectedLetter === letter ? "active" : ""}`} onClick={() => handleLetterClick(letter)} title={`Huruf ${letter}`}>
                <img src={alphabetSigns[letter]} alt={`Huruf ${letter}`} className="sign-image" />
                <div className="letter">{letter}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="kamus-results">
          {Object.keys(groupedData).length > 0 ? (
            Object.keys(groupedData)
              .sort()
              .map((letter) => (
                <div key={letter} className="letter-group">
                  <h4 className="letter-title">Huruf {letter}</h4>
                  <div className="words-grid">
                    {groupedData[letter].map((item) => (
                      <div key={item.id} className="word-card" onClick={() => setSelectedWord(item)}>
                        <img src={alphabetSigns[item.letter]} alt={`Huruf ${item.letter}`} className="word-gesture-img" />
                        <h5>{item.word}</h5>
                        <span className="word-category">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <div className="no-results">
              <p>❌ Tidak ada kata yang ditemukan</p>
            </div>
          )}
        </div>

        {/* Video Modal */}
        {selectedLetterVideo && (
          <div className="modal-overlay" onClick={() => setSelectedLetterVideo(null)}>
            <div className="modal-content video-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedLetterVideo(null)}>
                ✕
              </button>
              <div className="video-container">
                <video width="100%" height="100%" controls autoPlay>
                  <source src={`/videos/${selectedLetterVideo}.mp4`} type="video/mp4" />
                  Browser Anda tidak mendukung video HTML5. Silakan gunakan browser yang lebih baru.
                </video>
              </div>
              <div className="video-info">
                <h2>Huruf {selectedLetterVideo}</h2>
                <p>
                  <img src={alphabetSigns[selectedLetterVideo]} alt={`Huruf ${selectedLetterVideo}`} className="video-gesture-img" />
                  Gerakan Tangan untuk Huruf {selectedLetterVideo}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {selectedWord && (
          <div className="modal-overlay" onClick={() => setSelectedWord(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedWord(null)}>
                ✕
              </button>
              <div className="modal-body">
                <img src={alphabetSigns[selectedWord.letter]} alt={`Huruf ${selectedWord.letter}`} className="modal-gesture-img" />
                <h2>{selectedWord.word}</h2>
                <span className="modal-letter">Huruf {selectedWord.letter}</span>
                <p className="modal-description">{selectedWord.description}</p>
                <span className="modal-category">{selectedWord.category}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
