import type { ApiResponseLogin } from "interfaces";

const BASE_URL = 'http://localhost:3000/api';

const login = async ({
  username,
  password
}: {
  username: string;
  password: string;
}) => {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }

  return res.json() as Promise<ApiResponseLogin>;
};

export const useLogin = () => {
  return { login };
};
