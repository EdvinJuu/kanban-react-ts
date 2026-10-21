import { useState } from "react";
import { login, register } from "../services/authService";
import { setToken } from "../utils/tokenUtils";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // navigate lets you change the URL in the address bar and tells the router
  // the location has changed
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    // reset states
    setError(null);
    setIsSubmitting(true);

    try {
      // First register
      if (mode === "register") await register(username, password);

      // login directly or after registering
      const { token } = await login(username, password);
      setToken(token);
      navigate("/", { replace: true });

      // DataBoundary isn't designed to work with these errors.
    } catch (error) {
      // isAxiosError is needed with typescript
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error ?? "Could not reach the server.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>{mode === "login" ? "Log in" : "Create Account"}</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        autoComplete="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (min. 8 characters)"
        autoComplete={mode === "login" ? "current-password" : "new-password"}
      />

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={isSubmitting}>
        {mode === "login" ? "Log in" : "Create account"}
      </button>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setError(null);
        }}
      >
        {mode === "login"
          ? "No account? Create one"
          : "Have an account? Log in"}
      </button>
    </form>
  );
};

export default Login;
