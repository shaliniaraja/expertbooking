import React from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
      const navigate = useNavigate();
       const handleUserLogin = () => {
    localStorage.setItem("role", "user");
    navigate("/expertlist");   
  };

  const handleExpertLogin = () => {
    localStorage.setItem("role", "expert");
    navigate("/my-bookings"); 
  };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <button
          style={{ ...styles.button, ...styles.userBtn }}
          onClick={handleUserLogin}
        >
          Login as User
        </button>

        <button
          style={{ ...styles.button, ...styles.expertBtn }}
          onClick={handleExpertLogin}
        >
          Login as Expert
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "320px",
  },
  title: {
    marginBottom: "30px",
    fontSize: "24px",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  userBtn: {
    backgroundColor: "#2196F3",
    color: "white",
  },
  expertBtn: {
    backgroundColor: "#2196F3",
    color: "white",
  },
};

export default Login;