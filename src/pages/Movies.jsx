import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";

const apiUrl = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const page = 1;
const language = "tr-TR";

const Movies = () => {
  const [movies, setMovies] = useState([]); // API'den gelen filmler
  const [loading, setLoading] = useState(true); // Yükleniyor durumu
  const [error, setError] = useState(""); // Hata durumu

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(
          `${apiUrl}/movie/popular?api_key=${API_KEY}&page=${page}&language=${language}`,
        );

        if (!response.ok) {
          throw new Error("Hata oluştu");
        }

        const data = await response.json();

        if (data.results) {
          setMovies(data.results);
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    getMovies();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  return <MovieList movies={movies} title="Popular Movies" />;
};

export default Movies;
