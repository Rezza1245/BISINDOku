import "../styles/Auth.css";
import logoBisindo from "../assets/logoBisindo.png";

export default function AuthLayout({ children }) {
    return (
        <div className="auth-container">
            {/* BAGIAN ATAS (Sekarang diwakili auth-left) */}
            <div className="auth-left">
                <img src={logoBisindo} alt="logo" className="logo" />
            </div>

            {/* BAGIAN BAWAH (Sekarang diwakili auth-right) */}
            <div className="auth-right">
                <div className="auth-description">
                    <p> BISINDOku merupakan sebuah aplikasi elearning berbasis digital
                        yang dirancang khusus untuk memfasilitasi proses pembelajaran
                        Bahasa Isyarat Indonesia (BISINDO). Kebutuhan kses Pendidikan 
                        inklsif yang setara, memudahkan penyandang tunarungu untuk mempelajari 
                        keterampilan komunikasi secara interaktif dan efektid dimana saja dan kapan saja
                        .</p>
                </div>

                {children}
            </div>
        </div>
    );
}