import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router";

const apiUrl = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const language = "tr-TR";

const SearchResults = () => {
  const [movies, setMovies] = useState([]); // API'den gelen filmler
  const [loading, setLoading] = useState(false); // Yükleniyor durumu
  const [error, setError] = useState(""); // Hata durumu
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısı

  const query = searchParams.get("query");
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/search/movie?api_key=${API_KEY}&page=${page}&language=${language}&query=${encodeURIComponent(query)}`,
        );

        if (!response.ok) {
          throw new Error("Hata oluştu");
        }

        const data = await response.json();

        if (data.results) {
          setMovies(data.results);
          setTotalPages(data.total_pages); // Toplam sayfa sayısını güncelle
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }

    getMovies();
  }, [searchParams]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!query)
    return <div className="container py-3">Please enter a search term.</div>;

  return (
    <>
      <MovieList movies={movies} title={`"${query}" için Arama Sonuçları`} />
      <Pagination
        page={page}
        totalPages={totalPages}
        setSearchParams={setSearchParams}
        query={query}
      />
    </>
  );
};

export default SearchResults;
