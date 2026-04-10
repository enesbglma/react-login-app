import { Link } from "react-router";
import { getImageUrl } from "../utils/imageHelper";

export default function Movie({ movieObj }) {
  return (
    <div className="col">
      <div
        className="card movie position-relative h-100 shadow-sm border-0 movie-card"
        style={{
          backgroundColor: "#212529",
          border: "1px solid #333 !important",
        }}
      >
        <Link to={`/movies/${movieObj.id}`} className="text-decoration-none">
          <div
            style={{
              height: "300px",
              position: "relative",
              overflow: "hidden",
            }}
            className="rounded-top"
          >
            {movieObj.poster_path && (
              <img
                src={getImageUrl(movieObj.poster_path, "w500")}
                alt={movieObj.title}
                className="card-img-top"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  zIndex: 2,
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}

            <div
              className="d-flex align-items-center justify-content-center bg-dark text-secondary"
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "#1a1a1a",
                flexDirection: "column",
                borderBottom: "1px solid #333",
              }}
            >
              <i
                className="bi bi-film mb-2"
                style={{ fontSize: "2.5rem", opacity: 0.5 }}
              ></i>
              <span
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Afiş Bulunamadı
              </span>
            </div>
          </div>
        </Link>

        <div
          className="card-body text-light"
          style={{ backgroundColor: "#212529" }}
        >
          <h2
            className="h6 card-title mb-0 text-truncate"
            title={movieObj.title}
          >
            {movieObj.title}
          </h2>
        </div>
      </div>
    </div>
  );
}
