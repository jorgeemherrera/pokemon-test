import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  usePokemons,
  usePokemonById,
  usePokemonBySearch,
} from "../usePokemons";

jest.mock("@uidotdev/usehooks", () => ({
  useDebounce: (value: string) => value,
}));

(globalThis.fetch as jest.Mock) = jest.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePokemons hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch pokemons successfully", async () => {
    const mockData = { results: [{ id: 1, name: "Bulbasaur" }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => usePokemons(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/pokemons?limit=9&offset=0&sort=number"
    );
    expect(result.current.data).toEqual(mockData);
  });

  it("should handle fetch error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => usePokemons(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe("usePokemonById hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch pokemon by id successfully", async () => {
    const mockPokemon = { id: 25, name: "Pikachu" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    });

    const { result } = renderHook(() => usePokemonById(25), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/pokemons/25");
    expect(result.current.data).toEqual(mockPokemon);
  });
});

describe("usePokemonBySearch hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should search pokemons when search term is provided", async () => {
    const mockSearchResult = { results: [{ id: 6, name: "Charizard" }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResult,
    });

    const { result } = renderHook(() => usePokemonBySearch("charizard"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/pokemons/search/charizard"
    );
    expect(result.current.data).toEqual(mockSearchResult);
  });

  it("should fetch default pokemons when search is empty", async () => {
    const mockDefault = { results: [{ id: 1, name: "Bulbasaur" }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockDefault,
    });

    const { result } = renderHook(() => usePokemonBySearch(""), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/pokemons?limit=9&offset=0&sort=number"
    );
  });

  it("should handle search fetch error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => usePokemonBySearch("mewtwo"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
