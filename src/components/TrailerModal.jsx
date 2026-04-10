import React, { useEffect, useState } from "react";
import axios from "axios";

const TrailerModal = ({ movieId, show, handleClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY; // API Key'ini unutma!

  useEffect(() => {
    if (show && movieId) {
      const fetchTrailer = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`,
          );
          // Profesyonel filtreleme: Sadece YouTube'daki "Trailer" türünü al
          const trailer = response.data.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube",
          );
          setTrailerKey(trailer ? trailer.key : null);
        } catch (error) {
          console.error("Fragman yüklenirken hata oluştu:", error);
        }
      };
      fetchTrailer();
    }
    return () => setTrailerKey(null);
  }, [show, movieId, API_KEY]);

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content bg-dark text-white border-secondary">
          <div className="modal-header border-secondary">
            <h5 className="modal-title">Film Fragmanı</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body p-0">
            {trailerKey ? (
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  title="YouTube video player"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="p-5 text-center">
                <p>Maalesef bu film için fragman bulunamadı. 🎬</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
