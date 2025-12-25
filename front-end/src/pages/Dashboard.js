import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
 // const navigate = useNavigate();

  /*useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
    */
  const user = JSON.parse(localStorage.getItem("user"));
    console.log("USER DASHBOARD:", user);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <h2>Selamat datang, {user?.username} 👋</h2>
    </div>
  );
}
