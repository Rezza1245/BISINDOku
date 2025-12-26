import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, newPassword }),
        });

        const data = await res.json();
        setMessage(data.message);
        if (data.message === "Password berhasil diubah") {
            setTimeout(() => {
                navigate("/login", {
                    state: { success: "Password berhasil diubah. Silakan login." },
                });
            }, 1500);
        }
    };

return (
    <AuthLayout>
      <div className="auth-card">
        <h2>Forgot Password</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password Baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className="btn-primary" type="submit">
            Reset Password
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </AuthLayout>
);
};