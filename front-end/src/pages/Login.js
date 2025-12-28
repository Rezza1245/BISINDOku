import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        setMessage(data.message);

        if (data.message === "Login berhasil" && data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/dashboard");
        }
    };

    return (
        <AuthLayout>
            <div className="auth-card">
                {/* HEADER */}
                <div className="auth-header">
                    <span className="welcome-text">
                        Welcome to <strong><span className="bisindo">BISINDO</span><span className="ku">ku</span></strong>
                    </span>

                    <div className="signup-link">
                        <span>No Account?</span>
                        <Link to="/register">Sign up</Link>
                    </div>
                </div>

                <h1 className="auth-title">Sign in</h1>

                {/* SOCIAL LOGIN
                <div className="social-login">
                    <button className="google">
                        <img src="/google.png" alt="google" />
                        Sign in with Google
                    </button>
                    <button className="icon-btn">
                        <img src="/fb.png" alt="fb" />
                    </button>
                    <button className="icon-btn">
                        <img src="/apple.png" alt="apple" />
                    </button>
                </div> */}

                {location.state?.success && (
                    <p style={{ color: "green", marginBottom: "10px" }}>
                        {location.state.success}
                    </p>
                )}
                
                {/* FORM */}
                <form className="auth-form" onSubmit={handleLogin}>
                    <label>Enter your username or email address</label>
                    <input
                        type="text"
                        placeholder="Username or email address"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Enter your Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Link to="/forgot-password" className="forgot">
                        Forgot Password
                    </Link>


                    <button className="btn-primary" type="submit">
                        Sign in
                    </button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </AuthLayout>

    );
}
