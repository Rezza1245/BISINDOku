import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="container">
      {/* KIRI */}
      <div className="left">
        <div className="left-top">
          <div className="logo">
            <div className="logo-circle">🤟</div>
              <h1 className="brand-text">
                <span className="brand-main">BISINDO</span>
                <span className="brand-sub">ku</span>
            </h1>
          </div>
        </div>

  <div className="left-bottom">
    <p className="description">
      BISINDOku merupakan sebuah aplikasi elearning berbasis digital
      yang dirancang khusus untuk memfasilitasi proses pembelajaran
      Bahasa Isyarat Indonesia (BISINDO).
    </p>
  </div>
</div>


      {/* KANAN */}
      <div className="right">
        <div className="login-card">

         {/* HEADER LOGIN */}
           <div className="login-header">
            <h1 className="brand-text">
              <span className="brand-main">BISINDO</span>
              <span className="brand-sub">ku</span>
            </h1>

            <div className="signup-area">
              <span className="no-account">No Account?</span>
              <a href="/signup" className="signup-link">Sign up</a>
            </div>
          </div>

          <h2>Sign in</h2>

          <div className="social-login">
  <button className="google-btn">
  <img
    src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
    alt="Google"
    className="google-icon"
  />
  <span>Sign in with Google</span>
</button>


  <button className="icon-btn fb-btn">
    <img
      src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
      alt="Facebook"
    />
  </button>

  <button className="icon-btn apple-btn">
    <img
      src="https://cdn-icons-png.flaticon.com/512/0/747.png"
      alt="Apple"
    />
  </button>
</div>


          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username atau email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
          Sign in
          </button>
          </form>

          <p className="message">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
