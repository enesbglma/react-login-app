import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

import Logo from "./components/Logo";
import SearchForm from "./components/SearchForm";
import WatchListButton from "./components/WatchListButton";

import WatchList from "./components/WatchList";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import { movie_list } from "./data";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App2() {
  const [movies, setMovies] = useState(movie_list); // İlk başta mock data göster
  const [watchlistMovies, setWatchListMovies] = useState([]);
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      // Boş arama ise mock data'yı göster
      setMovies(movie_list);
      return;
    }

    // Gerçek API'den arama yap
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=tr-TR`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("API hatası");
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Arama hatası:", error);
        // Hata durumunda mock data'yı kullan
        setMovies(
          movie_list.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  function handleAddToWatchList(movie) {
    const isAddedToList = watchlistMovies.map((i) => i.id).includes(movie.id);

    if (!isAddedToList) {
      setWatchListMovies((movies) => [...movies, movie]);
    }
  }

  function handleRemoveFromWatchList(movie) {
    setWatchListMovies((movies) => movies.filter((i) => i.id !== movie.id));
  }

  function handleSelectedMovie(movie) {
    setSelectedMovie(movie);
    window.scrollTo(0, 0); // Seçilen filme odaklanmak için sayfanın en üstüne kaydır
  }

  return (
    <>
      <Header>
        <Logo />
        <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <WatchListButton
          movies={watchlistMovies}
          onSetIsWatchListOpen={setIsWatchListOpen}
        />
      </Header>
      <Main>
        {selectedMovie && (
          <MovieDetails
            movieObj={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}

        {isWatchListOpen ? (
          <>
            <button
              className="btn btn-link p-0 mb-3"
              title="Geri dön"
              onClick={() => setIsWatchListOpen(false)}
              style={{ fontSize: "24px", color: "#666" }}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <WatchList
              movies={watchlistMovies}
              onRemoveFromWatchList={handleRemoveFromWatchList}
            />
          </>
        ) : (
          <>
            {loading && <div className="alert alert-info">Yükleniyor...</div>}
            <MovieList
              movies={movies}
              onAddToList={handleAddToWatchList}
              onSelectedMovie={handleSelectedMovie}
            />
          </>
        )}
      </Main>
      <Footer />
    </>
  );
}
