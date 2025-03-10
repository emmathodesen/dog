import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registrering feilet. Prøv igjen.");
      }

      alert("Bruker registrert! Logg inn for å fortsette.");
      navigate("/login"); // Send user to login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrer ny bruker</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleRegister}>
        <label>Brukernavn:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>E-post:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Passord:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registrer</button>
      </form>

      <p>Har du allerede en konto? <a href="/login">Logg inn her</a></p>
    </div>
  );
};

export default Register;
