import { getImageUrl } from "../utils/imageHelper";

export default function Actors({ actors }) {
  return (
    <div className="container my-3">
      <h1 className="mb-3 h4">Actors</h1>
      <div className="row">
        {actors.slice(0, 12).map((actor) => (
          <div key={actor.id} className="col-md-2 mb-4">
            <div style={{ height: "220px", position: "relative" }}>
              {actor.profile_path && (
                <img
                  src={getImageUrl(actor.profile_path, "w200")}
                  alt={actor.name}
                  className="img-fluid rounded shadow img-thumbnail"
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
                className="d-flex align-items-center justify-content-center rounded shadow img-thumbnail"
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#2c2c2c",
                  color: "#6c757d",
                  flexDirection: "column",
                  border: "1px solid #444",
                }}
              >
                <i
                  className="bi bi-person-fill mb-2"
                  style={{ fontSize: "2rem" }}
                ></i>
                <span style={{ fontSize: "11px" }}>Resim Yok</span>
              </div>
            </div>

            <p className="text-center mt-2 small fw-bold">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
