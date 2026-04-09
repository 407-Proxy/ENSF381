import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function DisplayStatus({ type, message }) {
  return <div className={type}>{message}</div>;
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        navigate("/flavors");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, navigate]);

  async function handleLogin(e) {
    e.preventDefault();

    if (!username || !password) {
      setMessageType("error");
      setMessage("Username and password cannot be empty.");
      return;
    }
    if (password.length < 8) {
      setMessageType("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      setMessageType("success");
      setMessage(`Welcome, ${data.username}! Redirecting...`);
      setLoginSuccess(true);
    } else {
      setMessageType("error");
      setMessage(data.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <br />
        <a href="#forgot">Forgot Password?</a>
        <br />
        <Link to="/signup">Need an account? Sign up</Link>
        {message && <DisplayStatus type={messageType} message={message} />}
      </form>
    </div>
  );
}

function LoginPage() {
  return (
    <div>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
}

export default LoginPage;
