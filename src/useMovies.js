import { useEffect, useState } from "react";

const url = "http://www.omdbapi.com/?apikey=9676097d&";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(url + `s=${query}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error("Something went wrong while fetching movies");
        }
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);
  return { movies, isloading, error };
}
