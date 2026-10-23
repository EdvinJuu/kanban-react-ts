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
    <form
      onSubmit={handleSubmit}
      className=" w-screen sm:w-120 m-auto mt-[20vh] rounded-lg p-6 bg-secondary text-detail-accent flex flex-col items-center"
    >
      <h1 className="text-2xl w-fit m-auto mb-3">
        Recursive Kanban!
      </h1>
      <p className="mb-5">Create your own task list. And then create a task list for your task!</p>
      <div className="flex flex-col sm:flex-row gap-3 mb-5 w-full justify-between items-center">
        <input
          className="text-detail-accent border-b w-52"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="username"
        />
        <input
          className="text-detail-accent border-b w-52"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min. 8 characters)"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />
      </div>

      {error && <p role="alert">{error}</p>}
      <div className="flex justify-between w-full">
        <button
          className={`${mode === "login" ? "bg-surface-accent" : "bg-positive"} px-4 py-0.5 rounded-lg`}
          type="submit"
          disabled={isSubmitting}
        >
          {mode === "login" ? "Log in" : "Create account"}
        </button>

        <button
          className={`${mode === "login" ? "bg-positive" : "bg-surface-accent"} px-4 py-0.5 rounded-lg`}
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError(null);
          }}
        >
          {mode === "login" ? "Create Account" : "Back to Log in"}
        </button>
      </div>
    </form>
  );
};

export default Login;
