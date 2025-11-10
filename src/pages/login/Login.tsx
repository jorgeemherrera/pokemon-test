import { useState } from "react";
import pokeballIcon from "@assets/pokeball.svg";
import { PokemonFilter } from "@components/PokemonFilter";
import { useLogin } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LayoutSpinner } from "@components/LayoutSpinner";
import "./Login.scss";

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const navigate = useNavigate();

  const { login } = useLogin();

  const validateField = (field: string, value: string) => {
    let message = "";

    if (field === "username" && !value.trim()) message = "Invalid username";
    if (field === "password" && value.length < 4) message = "Invalid password";

    setErrors((prev) => ({ ...prev, [field]: message || undefined }));
  };

  const handleChange = (field: "username" | "password", value: string) => {
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    validateField("username", username);
    validateField("password", password);

    if (!username.trim() || password.length < 4) {
      setLoading(false);
      return;
    }

    try {
      const data = await login({ username, password });
      sessionStorage.setItem("session_id", JSON.stringify(data.session));
      onLogin();
      navigate("/");
    } catch (err) {
      setErrors({
        username: "Invalid username",
        password: "Invalid password",
      });
      console.error(err);
    } finally {
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
            onChange={(e) => handleChange("username", e.target.value)}
          />
          {errors.username && (
            <span className="login__error subtitle-1">{errors.username}</span>
          )}
        </div>

        <div className="login__group">
          <PokemonFilter
            typeFilter="input-password"
            placeholder="Password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {errors.password && (
            <span className="login__error subtitle-1">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="login__button">
          {loading ? <LayoutSpinner size="small" color="white" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};
