import { useLogin } from "@hooks/useAuth";
import type { ApiResponseLogin } from "interfaces";

describe("useLogin", () => {
  const { login } = useLogin();

  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  it("should throw an error if username or password is missing", async () => {
    await expect(login({ username: "", password: "" })).rejects.toThrow(
      "Username and password are required"
    );
  });

  it("should throw an error if the response is not ok", async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      login({ username: "ash", password: "pikachu" })
    ).rejects.toThrow("Invalid username or password");
  });

  it("should return data if the response is successful", async () => {
    const mockResponse: ApiResponseLogin = {
      code: "200",
      message: "success",
      session: "token123",
    };

    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await login({ username: "ash", password: "pikachu" });

    expect(result).toEqual(mockResponse);
    expect(globalThis.fetch as jest.Mock).toHaveBeenCalledWith(
      "http://localhost:3000/api/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });
});
