import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <AuthLayout>
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Create your account</h2>
                    <p>
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn-primary" type="submit">
                        Register
                    </button>
                </form>

                {message && <p style={{ marginTop: "10px" }}>{message}</p>}
            </div>
        </AuthLayout>
    );
}
