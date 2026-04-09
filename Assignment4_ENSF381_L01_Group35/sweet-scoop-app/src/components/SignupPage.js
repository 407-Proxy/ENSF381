import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function DisplayStatus({ type, message }) {
  return <div className={type}>{message}</div>;
}

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  function validate() {
    if (!username || !email || !password || !confirmPassword) {
      return "All fields are required.";
    }
    if (username.length < 3 || username.length > 20) {
      return "Username must be between 3 and 20 characters.";
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(username)) {
      return "Username must start with a letter and contain only letters, numbers, underscores, or hyphens.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Email must be in a valid format.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  }

  async function handleSignup(e) {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessageType("error");
      setMessage(error);
      return;
    }

    const response = await fetch("http://localhost:5001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();

    if (data.success) {
      setMessageType("success");
      setMessage("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setMessageType("error");
      setMessage(data.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label>Confirm Password: </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
        <br />
        <Link to="/login">Already have an account? Login</Link>
        {message && <DisplayStatus type={messageType} message={message} />}
      </form>
    </div>
  );
}

function SignupPage() {
  return (
    <div>
      <Header />
      <SignupForm />
      <Footer />
    </div>
  );
}

export default SignupPage;
