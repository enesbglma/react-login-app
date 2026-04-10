import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Actors from "../components/Actors";
import SimilarMovies from "./SimilarMovies";
import { UserContext } from "../contexts/UserContext";
import TrailerModal from "../components/TrailerModal";

const apiUrl = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const language = "tr-TR";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null); // API'den gelen film
  const [loading, setLoading] = useState(true); // Yükleniyor durumu
  const [error, setError] = useState(""); // Hata durumu

  const [showModal, setShowModal] = useState(false);

  const { addToWatchList, removeFromWatchList, watchlist } =
    useContext(UserContext);

  const isAdded = watchlist?.find((i) => i.id === movie?.id);

  useEffect(() => {
    async function getMovie() {
      try {
        const response = await fetch(
          `${apiUrl}/movie/${id}?api_key=${API_KEY}&language=${language}&append_to_response=credits`,
        );

        if (!response.ok) {
          throw new Error("Hata oluştu");
        }

        const data = await response.json();
        setMovie(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
      window.scrollTo(0, 0);
    }

    getMovie();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <div
        className="text-white position-relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <div className="img-overlay">
          <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="row">
              <div className="col-md-3 d-none d-lg-block">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid rounded shadow img-thumbnail"
                />
              </div>
              <div className="col-md-9">
                <h1 className="display-4">{movie.title}</h1>
                <p>
                  {movie.release_date} <i className="bi bi-dot text-white"></i>
                  <span className="text-white">
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </span>
                  <i className="bi bi-dot text-white"></i>
                  {movie.runtime} dk
                </p>

                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-warning fs-6">
                    {Math.round(movie.vote_average * 10)}%
                  </span>
                  <span className="badge bg-danger fs-6 ms-2 pointer">
                    {isAdded ? (
                      <i
                        className="bi bi-heart-fill"
                        onClick={() => removeFromWatchList(movie)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-heart"
                        onClick={() => addToWatchList(movie)}
                      ></i>
                    )}
                  </span>

                  <button
                    className="btn btn-outline-light btn-sm ms-3 d-inline-flex align-items-center px-2 py-1 fs-13n narin-buton"
                    onClick={() => setShowModal(true)}
                  >
                    <i className="bi bi-play-fill fs-6 me-1"></i>
                    <span className="fs-13n">Fragmanı Göster</span>
                  </button>
                </div>

                {movie.overview && (
                  <p className="lead">
                    <strong>Özet: </strong>
                    {movie.overview}
                  </p>
                )}
                <div className="row row-cols-2 row-cols-md-3 g-4 mt-3 pt-3 border-top border-secondary border-opacity-25">
                  <div className="d-flex flex-column align-items-start">
                    <span className="fw-bold text-warning small text-uppercase">
                      Yapımcı
                    </span>
                    <span className="fs-6 mt-1">
                      {movie.production_companies[0]?.name || "Bilgi Yok"}
                    </span>
                  </div>

                  <div className="d-flex flex-column align-items-start">
                    <span className="fw-bold text-warning small text-uppercase">
                      Yönetmen
                    </span>
                    <span className="fs-6 mt-1">
                      {movie.credits.crew.find(
                        (person) => person.job === "Director",
                      )?.name || "Bilgi Yok"}
                    </span>
                  </div>

                  <div className="d-flex flex-column align-items-start">
                    <span className="fw-bold text-warning small text-uppercase">
                      Senarist
                    </span>
                    <span className="fs-6 mt-1">
                      {movie.credits.crew.find(
                        (person) =>
                          person.job === "Writer" ||
                          person.job === "Screenplay",
                      )?.name || "Bilgi Yok"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Actors actors={movie.credits.cast} />
      <SimilarMovies movieId={id} />

      <TrailerModal
        movieId={id}
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default MovieDetails;
