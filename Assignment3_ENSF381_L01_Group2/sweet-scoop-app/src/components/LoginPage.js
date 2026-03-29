import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [users, setUsers] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        navigate("/flavors");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, navigate]);

  function handleLogin(e) {
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

    const matchedUser = users.find(
      (user) => user.username === username && user.email === password,
    );

    if (matchedUser) {
      setMessageType("success");
      setMessage(`Welcome, ${matchedUser.name}! Redirecting...`);
      setLoginSuccess(true);
    } else {
      setMessageType("error");
      setMessage("Invalid username or password.");
    }
  }
  return (
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
      {message && <DisplayStatus type={messageType} message={message} />}
    </form>
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
