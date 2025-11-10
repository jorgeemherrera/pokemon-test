import { useState } from "react";
import pokeballIcon from "@assets/pokeball.svg";
import { PokemonFilter } from "@components/PokemonFilter";
import { useLogin } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { LayoutSpinner } from "@components/LayoutSpinner";

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = "Invalid username";
    if (password.length < 4) newErrors.password = "Invalid password";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await login({ username, password });
        sessionStorage.setItem("session_id", JSON.stringify(data.session));
        onLogin();
        navigate("/");
      } catch (err) {
        alert("Login error: " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__title headline">
          <img src={pokeballIcon} alt="Pokémon" width="150" height="150" />
          <h1>Pokédex</h1>
        </div>

        <div className="login__group">
          <PokemonFilter
            typeFilter="input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <span className="login__error">{errors.username}</span>
          )}
        </div>

        <div className="login__group">
          <PokemonFilter
            typeFilter="input-password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="login__error">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="login__button">
          {loading && <LayoutSpinner size="small" color="white" />}
          {!loading && "Submit"}
        </button>
      </form>
    </div>
  );
};
